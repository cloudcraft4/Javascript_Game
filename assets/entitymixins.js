// Create our Mixins namespace
Game.EntityMixins = {};

// Main player's actor mixin
Game.EntityMixins.PlayerActor = {
    name: 'PlayerActor',
    groupName: 'Actor',
    act: function() {
        if (this._acting) {
            return;
        }
        this._acting = true;
        this.addTurnHunger();
        // Detect if the game is over
        if (!this.isAlive()) {
            Game.Screen.playScreen.setGameEnded(true);
            // Send a last message to the player
            Game.sendMessage(this, 'Press [Enter] to continue!');
        }
        // Re-render the screen
        Game.refresh();
        // Lock the engine and wait asynchronously
        // for the player to press a key.
        this.getMap().getEngine().lock();
        // Clear the message queue
        this.clearMessages();
        this._acting = false;
    },
    //Everytime something dies this is called
    deathTrigger: function(cause) {
        let partsSlot = this.getBodySlots();
        for (let i = 0; i < partsSlot.length; i++) {
            //Go through each part and decrease cooldown by one
            if (Boolean(partsSlot[i].part._maxCoolDown)) {
                if (partsSlot[i].part._currentCoolDown > 0) {            
                    partsSlot[i].part._currentCoolDown -= 1;
                }           
            }
            //Check each part to see if there is a deathAbility to run
            if (Boolean(partsSlot[i].part.deathAbility)) {
                partsSlot[i].part.deathAbility(cause);
            }
        }
    },
};

Game.EntityMixins.FungusActor = {
    name: 'FungusActor',
    groupName: 'Actor',
    init: function() {
        this._growthsRemaining = 5;
    },
    act: function() { 
        // Check if we are going to try growing this turn
        if (this._growthsRemaining > 0) {
            if (Math.random() <= 0.02) {
                // Generate the coordinates of a random adjacent square by
                // generating an offset between [-1, 0, 1] for both the x and
                // y directions. To do this, we generate a number from 0-2 and then
                // subtract 1.
                var xOffset = Math.floor(Math.random() * 3) - 1;
                var yOffset = Math.floor(Math.random() * 3) - 1;
                // Make sure we aren't trying to spawn on the same tile as us
                if (xOffset != 0 || yOffset != 0) {
                    // Check if we can actually spawn at that location, and if so
                    // then we grow!
                    if (this.getMap().isEmptyFloor(this.getX() + xOffset,
                                                   this.getY() + yOffset,
                                                   this.getZ())) {
                        var entity = Game.EntityRepository.create('fungus');
                        entity.setPosition(this.getX() + xOffset, this.getY() + yOffset, 
                            this.getZ());
                        this.getMap().addEntity(entity);
                        this._growthsRemaining--;
                        // Send a message nearby!
                        Game.sendMessageNearby(this.getMap(),
                            entity.getX(), entity.getY(), entity.getZ(),
                            'The fungus is spreading!');
                    }
                }
            }
        }
    }
};

Game.EntityMixins.TaskActor = {
    name: 'TaskActor',
    groupName: 'Actor',
    init: function(template) {
        // Load tasks
        this._tasks = template['tasks'] || ['wander']; 
        //Checking if the entity is friendly to player
        this._isAlly = template['isAlly'] || false; 
    },
    act: function() {
        // Iterate through all our tasks
        for (var i = 0; i < this._tasks.length; i++) {
            if (this.canDoTask(this._tasks[i])) {
                // If we can perform the task, execute the function for it.
                this[this._tasks[i]]();
                return;
            }
        }
    },
    canDoTask: function(task) {
        if (task === 'hunt') {
            return this.hasMixin('Sight') && this.canSee(this.getMap().getPlayer());
        } else if (task === 'wander') {
            return true;
        } else {
            throw new Error('Tried to perform undefined task ' + task);
        }
    },
    follow: function() {
        console.log('I am trying to follow');
    },

    hunt: function() {
        //Check whether to target player or enemy
        if (this._isAlly) {
            //It does this EVERY turn.  It is very CPU intensive.  Need to rethink
            //how I do this.
            var target = this.getClosestEntity();
        } else {var target = this.getMap().getPlayer()}
         
        //If Ally has no target then just follow player
        if (target) {
            // If we are adjacent to the player, then attack instead of hunting.
            var offsets = Math.abs(target.getX() - this.getX()) + 
                Math.abs(target.getY() - this.getY());
            console.log('My target it ' + target.getName() + ' and offest is ' + offsets);
            if (offsets === 1) {
                if (this.hasMixin('Attacker')) {
                    this.attack(target);
                    console.log(this.getName() + ' has hit ' + target.getName());
                    return;
                }
            }
            // Generate the path and move to the first tile.
            var source = this;
            var z = source.getZ();
            var path = new ROT.Path.AStar(target.getX(), target.getY(), function(x, y) {
                // If an entity is present at the tile, can't move there.
                var entity = source.getMap().getEntityAt(x, y, z);
                if (entity && entity !== target && entity !== source) {
                    return false;
                }
                return source.getMap().getTile(x, y, z).isWalkable();
            }, {topology: 4});
            // Once we've gotten the path, we want to move to the second cell that is
            // passed in the callback (the first is the entity's strting point)
            var count = 0;
            path.compute(source.getX(), source.getY(), function(x, y) {
                if (count == 1) {
                    source.tryMove(x, y, z);
                }
                count++;
            });
        } else {
            this.follow();
        }
    },

    getClosestEntity: function() {
        //Return the coordinates of the closest entity
        let playerX = Game.Screen.playScreen._player.getX();
        let playerY = Game.Screen.playScreen._player.getY();
        let playerZ = Game.Screen.playScreen._player.getZ();
        let map = Game.Screen.playScreen._player.getMap();
        let sourceX = this.getX();
        let sourceY = this.getY();
        let targetEntity = false;
        let areaSize = 1;

        //Look at every tile in an ever widening square for entities (up to size 8)
        while (!targetEntity && areaSize <= 8) {
            for (let xPos = sourceX - areaSize; xPos <= (sourceX + areaSize); xPos++) {
                
                //Check every tile on left and right of square    
                if (Math.abs(sourceX - xPos) === areaSize) {
                    for (let yPos = sourceY - areaSize; yPos <= (sourceY + areaSize); yPos++) {
                        //Check if there is an entity at this spot
                        if (!targetEntity && (xPos !== playerX && yPos !== playerY)) {
                            targetEntity = map.getEntityAt(xPos, yPos, playerZ);
                        }
                    }
                //Check the top and bottom of the square
                } else {
                    let yPos = sourceY + areaSize;
                    //Check the top of square for entity
                    if (!targetEntity && (xPos !== playerX && yPos !== playerY)) {
                        targetEntity = map.getEntityAt(xPos, yPos, playerZ);
                    }
                    //Check the bottom of square if nothing on top
                    yPos = sourceY - areaSize;
                    if (!targetEntity && (xPos !== playerX && yPos !== playerY)) {
                        targetEntity = map.getEntityAt(xPos, yPos, playerZ); 
                    }           
                }
            }
            areaSize++;
        };
        return targetEntity;
    },
    

    wander: function() {
        // Flip coin to determine if moving by 1 in the positive or negative direction
        var moveOffset = (Math.round(Math.random()) === 1) ? 1 : -1;
        // Flip coin to determine if moving in x direction or y direction
        if (Math.round(Math.random()) === 1) {
            this.tryMove(this.getX() + moveOffset, this.getY(), this.getZ());
        } else {
            this.tryMove(this.getX(), this.getY() + moveOffset, this.getZ());
        }
    }
};

Game.EntityMixins.GiantZombieActor = Game.extend(Game.EntityMixins.TaskActor, {
    init: function(template) {
        // Call the task actor init with the right tasks.
        Game.EntityMixins.TaskActor.init.call(this, Game.extend(template, {
            'tasks' : ['growArm', 'spawnSlime', 'hunt', 'wander']
        }));
        // We only want to grow the arm once.
        this._hasGrownArm = false;
    },
    canDoTask: function(task) {
        // If we haven't already grown arm and HP <= 20, then we can grow.
        if (task === 'growArm') {
            return this.getHp() <= 20 && !this._hasGrownArm;
        // Spawn a slime only a 10% of turns.
        } else if (task === 'spawnSlime') {
            return Math.round(Math.random() * 100) <= 10;
        // Call parent canDoTask
        } else {
            return Game.EntityMixins.TaskActor.canDoTask.call(this, task);
        }
    },
    growArm: function() {
        this._hasGrownArm = true;
        this.increaseAttackValue(5);
        // Send a message saying the zombie grew an arm.
        Game.sendMessageNearby(this.getMap(),
            this.getX(), this.getY(), this.getZ(),
            'An extra arm appears on the giant zombie!');
    },
    spawnSlime: function() {
        // Generate a random position nearby.
        var xOffset = Math.floor(Math.random() * 3) - 1;
        var yOffset = Math.floor(Math.random() * 3) - 1;

        // Check if we can spawn an entity at that position.
        if (!this.getMap().isEmptyFloor(this.getX() + xOffset, this.getY() + yOffset,
            this.getZ())) {
            // If we cant, do nothing
            return;
        }
        // Create the entity
        var slime = Game.EntityRepository.create('slime');
        slime.setX(this.getX() + xOffset);
        slime.setY(this.getY() + yOffset)
        slime.setZ(this.getZ());
        this.getMap().addEntity(slime);
    },
    listeners: {
        onDeath: function(attacker) {
            // Switch to win screen when killed!
            Game.switchScreen(Game.Screen.winScreen);
        }
    }
});


// This signifies our entity can attack basic destructible enities
Game.EntityMixins.Attacker = {
    name: 'Attacker',
    groupName: 'Attacker',
    init: function(template) {
        this._attackValue = template['attackValue'] || 1;
        this._strength = template['strength'] || 1;
        this._dexterity = template['dexterity'] || 1;
        this._constitution = template['constitution'] || 1;
        this._intellegence = template['intellegence'] || 1;
        this._wisdom = template['wisdom'] || 1;
        this._charisma = template['charisma'] || 1;
        this._strength = template['strength'] || 1;
        this._challengeRating = template['challengeRating'] || 0;
    },
    getAttackValue: function() {
        var modifier = 0;
        // If we can equip body parts, then have to take into 
        // consideration these parts.
        if (this.hasMixin(Game.EntityMixins.Equipper)) {
            if (this.getBodySlots()) {
                let partsSlot = this.getBodySlots();
                for (i = 0; i < partsSlot.length; i++) {
                    // REMOVE THIS WHEN REMAKE DEFAULT ITEMS
                    if (Object.keys(partsSlot[i].part).length != 0) {
                        modifier += partsSlot[i].part.getAttackValue();
                    }
                }
            }
        }
        return this._attackValue + modifier;
    },
    increaseAttackValue: function(value) {
        // If no value was passed, default to 2.
        value = value || 2;
        // Add to the attack value.
        this._attackValue += value;
        Game.sendMessage(this, "You look stronger!");
    },
    attack: function(target, message='strike', cause=false) {
        // If the target is destructible, calculate the damage
        // based on attack and defense value

// New calculation:  roll D20 and add modifiers.  If total exceed enemy AC then it is a hit.  Attack modifiers most often
// ability modifier (STR for melee and DEX for ranged) and proficiency bonus.  You add proficiency bonus if you have it for that
// weapon or spell.  Natural 20 is automatic hit and is a critical and Natural 1 is automatic miss.

// Damage:  You roll dice based on what weapon it is and add ability modifier to that number.  Spells may or may not use a 
// modifier depending on which one it is.
// Critical Hit: roll twice as many dice and then add modifier (modifier only added once)

// Resistances/Vulnerability:  After calculating damage either halve it for restistance or double it for vulnerability.  Multiple
// sources of resistance do nothing extra.  Example fireball against creature with magic and fire resistance.  

        if (target.hasMixin('Destructible')) {
            let attack = this.getAttackValue();
            let defense = target.getDefenseValue();
            let max = Math.max(0, attack - defense);
            let damage = 1 + Math.floor(Math.random() * max);

            Game.sendMessage(this, 'You ' + message + ' the %s for %d damage!', 
                [target.getName(), damage]);
            Game.sendMessage(target, 'The %s ' + message + ' you for %d damage!', 
                [this.getName(), damage]);

            target.takeDamage(this, damage, cause);
        }
    },
    // Check if the body part referenced has an associated ability
    getAbility: function(number) {
        let bodySlots = this.getBodySlots();
        //REMAKE THIS WHEN CHANGE DEFAULT PARTS>>>>>>>>
        if (Object.keys(bodySlots[number].part).length != 0) {
            return bodySlots[number].part.getAbility()      
        } else {
            return false;
        }
    },
    listeners: {
        details: function() {
            return [{key: 'attack', value: this.getAttackValue()}];
        }
    }
};

// This mixin signifies an entity can take damage and be destroyed
Game.EntityMixins.Destructible = {
    name: 'Destructible',
    init: function(template) {
        this._maxHp = template['maxHp'] || 10;
        // We allow taking in health from the template incase we want
        // the entity to start with a different amount of HP than the 
        // max specified.
        this._hp = template['hp'] || this._maxHp;
        this._defenseValue = template['defenseValue'] || 0;
    },
    getDefenseValue: function() {
        var modifier = 0;
        // If we can equip parts, then have to take into 
        // consideration these parts.     
          
        if (this.hasMixin(Game.EntityMixins.Equipper)) {
             if (this.getBodySlots()) {
                let partsSlot = this.getBodySlots();
                for (let i = 0; i < partsSlot.length; i++) {
                    // Change this when I modify how default items work
                    // This is checking if object is empty.  Apparently this
                    // is challenging to do.
                    if (Object.keys(partsSlot[i].part).length != 0) {
                        modifier += partsSlot[i].part._defenseValue;
                    }
                }
            }
        }
        return this._defenseValue + modifier;

    },
    getHp: function() {
        return this._hp;
    },
    getMaxHp: function() {
        return this._maxHp;
    },
    setHp: function(hp) {
        this._hp = hp;
    },
    getChallengeRating: function() {
        return this._challengeRating;
    },
    increaseDefenseValue: function(value) {
        // If no value was passed, default to 2.
        value = value || 2;
        // Add to the defense value.
        this._defenseValue += value;
        Game.sendMessage(this, "You look tougher!");
    },
    increaseMaxHp: function(value) {
        // If no value was passed, default to 10.
        value = value || 10;
        // Add to both max HP and HP.
        this._maxHp += value;
        this._hp += value;
        Game.sendMessage(this, "You look healthier!");
    },
    takeDamage: function(attacker, damage, cause) {
        this._hp -= damage;
        // If have 0 or less HP, then remove ourseles from the map
        if (this._hp <= 0) {
            Game.sendMessage(attacker, 'You kill the %s!', [this.getName()]);
            // Raise events
            this.raiseEvent('onDeath', attacker);
            attacker.raiseEvent('onKill', this);
            //Handle ability cool downs and other on death abilities
                //WHAT HAPPENS IF PERSON KILLED IN PLAYER????
            Game.Screen.playScreen._player.deathTrigger(cause);
            this.kill();
        }
    },
    listeners: {
        onGainLevel: function() {
            // Heal the entity.
            this.setHp(this.getMaxHp());
        },
        details: function() {
            return [
                {key: 'defense', value: this.getDefenseValue()},
                {key: 'hp', value: this.getHp()}
            ];
        }
    }
};

Game.EntityMixins.MessageRecipient = {
    name: 'MessageRecipient',
    init: function(template) {
        this._messages = [];
    },
    receiveMessage: function(message) {
        this._messages.push(message);
    },
    getMessages: function() {
        return this._messages;
    },
    clearMessages: function() {
        this._messages = [];
    }
};

// This signifies our entity posseses a field of vision of a given radius.
Game.EntityMixins.Sight = {
    name: 'Sight',
    groupName: 'Sight',
    init: function(template) {
        this._sightRadius = template['sightRadius'] || 5;
    },
    getSightRadius: function() {
        return this._sightRadius;
    },
    increaseSightRadius: function(value) {
        // If no value was passed, default to 1.
        value = value || 1;
        // Add to sight radius.
        this._sightRadius += value;
        Game.sendMessage(this, "You are more aware of your surroundings!");
    },
    canSee: function(entity) {
        // If not on the same map or on different floors, then exit early
        if (!entity || this._map !== entity.getMap() || this._z !== entity.getZ()) {
            return false;
        }

        var otherX = entity.getX();
        var otherY = entity.getY();

        // If we're not in a square field of view, then we won't be in a real
        // field of view either.
        if ((otherX - this._x) * (otherX - this._x) +
            (otherY - this._y) * (otherY - this._y) >
            this._sightRadius * this._sightRadius) {
            return false;
        }

        // Compute the FOV and check if the coordinates are in there.
        var found = false;
        this.getMap().getFov(this.getZ()).compute(
            this.getX(), this.getY(), 
            this.getSightRadius(), 
            function(x, y, radius, visibility) {
                if (x === otherX && y === otherY) {
                    found = true;
                }
            });
        return found;
    }
};

// Message sending functions
Game.sendMessage = function(recipient, message, args) {
    // Make sure the recipient can receive the message 
    // before doing any work.
    if (recipient.hasMixin(Game.EntityMixins.MessageRecipient)) {
        // If args were passed, then we format the message, else
        // no formatting is necessary
        if (args) {
            message = vsprintf(message, args);
        }
        recipient.receiveMessage(message);
    }
};
Game.sendMessageNearby = function(map, centerX, centerY, centerZ, message, args) {
    // If args were passed, then we format the message, else
    // no formatting is necessary
    if (args) {
        message = vsprintf(message, args);
    }
    // Get the nearby entities
    entities = map.getEntitiesWithinRadius(centerX, centerY, centerZ, 5);
    // Iterate through nearby entities, sending the message if
    // they can receive it.
    for (var i = 0; i < entities.length; i++) {
        if (entities[i].hasMixin(Game.EntityMixins.MessageRecipient)) {
            entities[i].receiveMessage(message);
        }
    }
};

Game.EntityMixins.InventoryHolder = {
    name: 'InventoryHolder',
    init: function(template) {
        // Default to 20 inventory slots.
        var inventorySlots = template['inventorySlots'] || 20;
        // Set up an empty inventory.
        this._items = new Array(inventorySlots);

    },
    getItems: function() {
        return this._items;
    },
    getItem: function(i) {
        return this._items[i];
    },

    addItem: function(item) {
        // Try to find a slot, returning true only if we could add the item.
        for (var i = 0; i < this._items.length; i++) {
            if (!this._items[i]) {
                this._items[i] = item;
                return true;
            }
        }
        return false;
    },
    
    removeItem: function(i) {
        this._items[i] = null;
    },

    canAddItem: function() {
        // Check if we have an empty slot.
        for (var i = 0; i < this._items.length; i++) {
            if (!this._items[i]) {
                return true;
            }
        }
        return false;
    },
    
    pickupItems: function(indices) {
        // Allows the user to pick up items from the map, where indices is
        // the indices for the array returned by map.getItemsAt
        var mapItems = this._map.getItemsAt(this.getX(), this.getY(), this.getZ());
        var added = 0;
        // Iterate through all indices.
        for (var i = 0; i < indices.length; i++) {
            // Try to add the item. If our inventory is not full, then splice the 
            // item out of the list of items. In order to fetch the right item, we
            // have to offset the number of items already added.
            if (this.addItem(mapItems[indices[i]  - added])) {
                mapItems.splice(indices[i] - added, 1);
                added++;
            } else {
                // Inventory is full
                break;
            }
        }
        // Update the map items
        this._map.setItemsAt(this.getX(), this.getY(), this.getZ(), mapItems);
        // Return true only if we added all items
        return added === indices.length;
    },
    dropItem: function(i) {
        // Drops an item to the current map tile
        if (this._items[i]) {
            if (this._map) {
                this._map.addItem(this.getX(), this.getY(), this.getZ(), this._items[i]);
            }
            this.removeItem(i);      
        }
    }
};

Game.EntityMixins.FoodConsumer = {
    name: 'FoodConsumer',
    init: function(template) {
        this._maxFullness = template['maxFullness'] || 1000;
        // Start halfway to max fullness if no default value
        this._fullness = template['fullness'] || (this._maxFullness / 2);
        // Number of points to decrease fullness by every turn.
        this._fullnessDepletionRate = template['fullnessDepletionRate'] || .8;
    },
    addTurnHunger: function() {
        // Remove the standard depletion points
        this.modifyFullnessBy(-this._fullnessDepletionRate);
    },
    modifyFullnessBy: function(points) {
        this._fullness = this._fullness + points;
        if (this._fullness <= 0) {
            this.kill("You have died of starvation!");
        } else if (this._fullness > this._maxFullness) {
            this.kill("You choke and die!");
        }
    },
    getHungerState: function() {
        // Fullness points per percent of max fullness
        var perPercent = this._maxFullness / 100;
        // 5% of max fullness or less = starving
        if (this._fullness <= perPercent * 5) {
            return 'Starving';
        // 25% of max fullness or less = hungry
        } else if (this._fullness <= perPercent * 25) {
            return 'Hungry';
        // 95% of max fullness or more = oversatiated
        } else if (this._fullness >= perPercent * 95) {
            return 'Oversatiated';
        // 75% of max fullness or more = full
        } else if (this._fullness >= perPercent * 75) {
            return 'Full';
        // Anything else = not hungry
        } else {
            return 'Not Hungry';
        }
    }
};

Game.EntityMixins.CorpseDropper = {
    name: 'CorpseDropper',
    init: function(template) {
        // Chance of dropping a cropse (out of 100).
        this._corpseDropRate = template['corpseDropRate'] || 100;
    },
    listeners: {
        onDeath: function(attacker) {
            // Check if we should drop a corpse.
            if (Math.round(Math.random() * 100) <= this._corpseDropRate) {
                // Create a new corpse item and drop it.
                this._map.addItem(this.getX(), this.getY(), this.getZ(),
                    Game.ItemRepository.create('corpse', {
                        name: this._name + ' corpse',
                        foreground: this._foreground
                    }));
            }
            // Drop a body part if one is available
            if (this.hasMixin(Game.EntityMixins.Equipper)) {
                let slots = this.getBodySlots();
                for (i = 0; i < slots.length; i++) {
                    // Redo this when I change how default parts work
                    if (Object.keys(slots[i].part).length != 0) {
                        this._map.addItem(this.getX(), this.getY(), this.getZ(),
                            slots[i].part);
                        break;
                    }
                }
                
            }    
        }
    }
};

Game.EntityMixins.Equipper = {
    name: 'Equipper',
    init: function(template) {

        // Set up the body part slots
        let bodySlots = template['bodySlots'] || 
            [rightArm = {
                name: 'Right Arm',
                slot: 'arm',
                part: {}
            },
            leftArm = {
                name: 'Left Arm',
                slot: 'arm',
                part: {}
            },
            mainLegs = {
                name: 'Legs',
                slot: 'legs',
                part: {}
            },
            mainHead = {
                name: 'Head',
                slot: 'head',
                part: {}
            },
            mainTorso = {
                name: 'Torso',
                slot: 'torso',
                part: {}
            }];
        
        let possibleParts = template['possibleParts'] || false;
        
        this._bodySlots = bodySlots;
        this._possibleParts = possibleParts
        //When entity is given parts these are set to the appropriate value
        this._defaultLeg = false;
        this._defaultArm = false;
        this._defaultTorso = false;
    },

    attachPart: function(item) {
        if (item.getPart()) {
            //PULL UP SCREEN ASKING WHAT SLOT TO INSTALL
            //TEMPORARILY THIS JUST AUTOMATICALLY SLOTS THEM
            if (item.getPart() === 'arm') {
                this._bodySlots[0].part = item;
            } else if (item.getPart() === 'legs') {
                this._bodySlots[2].part = item;
            } else if (item.getPart() === 'torso') {
                this._bodySlots[3].part = item;
            } else if (item.getPart() === 'head') {
                this._bodySlots[4].part = item;
            } else {
                console.log('Error: Item isPart() but is not arm, leg or torso.');
                console.log('Typo likely of item =' + item.name +' in item.js');
            }
        } else {
            console.log('You cannot attach this item');
        }
    },
   
    removePart: function(item) {
        if (item.getPart()) {
            //PULL UP SCREEN ASKING WHAT SLOT TO REMOVE
            //TEMPORARILY THIS JUST AUTOMATICALLY REMOVES THEM
            if (item.getPart() === 'arm') {
                this._bodySlots[0].part = this.getDefaultPart('arm');
            } else if (item.getPart() === 'legs') {
                this._bodySlots[2].part = this.getDefaultPart('legs');
            } else if (item.getPart() === 'torso') {
                this._bodySlots[3].part = this.getDefaultPart('torso');
            } else if (item.getPart() === 'head') {
                this._bodySlots[4].part = this.getDefaultPart('head');
            } else {
                console.log('Error: Item isPart() but is not arm, leg or torso.');
                console.log('Typo likely of item =' + item.name +' in item.js');
            }
        } else {
            console.log('You cannot remove this item');
        }
    },

    getBodySlots: function() {
        return this._bodySlots;
    },

    getPossibleParts: function() {
        return this._possibleParts;
    },

    getPart: function(number) {
        return this._bodySlots[number].part;
    },

    getRandomPossiblePart: function() {
        let randomIndex = Math.floor(Math.random() * this._possibleParts.length);
        let randomPart = this._possibleParts[randomIndex];
        return randomPart;
    },

    getDefaultPart: function(partSlot) {
        switch(partSlot) {
            case 'leg':
                return this._defaultLeg;
            case 'arm':
                return this._defaultArm;
            case 'torso':
                return this._defaultTorso;
            case 'head':
                return this._defaultHead;
            default:
                console.log('Error: The ' + partSlot + ' not found');
                break;
        }
    },
};

Game.EntityMixins.ExperienceGainer = {
    name: 'ExperienceGainer',
    init: function(template) {
        this._level = template['level'] || 1;
        this._experience = template['experience'] || 0;
        this._statPointsPerLevel = template['statPointsPerLevel'] || 1;
        this._statPoints = 0;
        // Determine what stats can be levelled up.
        this._statOptions = [];
        if (this.hasMixin('Attacker')) {
            this._statOptions.push(['Increase attack value', this.increaseAttackValue]);
        }
        if (this.hasMixin('Destructible')) {
            this._statOptions.push(['Increase defense value', this.increaseDefenseValue]);   
            this._statOptions.push(['Increase max health', this.increaseMaxHp]);
        }
        if (this.hasMixin('Sight')) {
            this._statOptions.push(['Increase sight range', this.increaseSightRadius]);
        }
    },
    getLevel: function() {
        return this._level;
    },
    getExperience: function() {
        return this._experience;
    },
    getNextLevelExperience: function() {
        var nextLevelExperience = 0;
        // I think this works? I don't need to subtract experience from this first right?
        // Also I MIGHT want to tweak numbers to make it better for PC?
        switch(this.getLevel() + 1)  {
            case 1: nextLevelExperience = 0; break;
            case 2: nextLevelExperience = 300; break;
            case 3: nextLevelExperience = 900; break;
            case 4: nextLevelExperience = 2700; break;
            case 5: nextLevelExperience = 6500; break;
            case 6: nextLevelExperience = 14000; break;
            case 7: nextLevelExperience = 23000; break;
            case 8: nextLevelExperience = 34000; break;
            case 9: nextLevelExperience = 48000; break;
            case 10: nextLevelExperience = 64000; break;
            case 11: nextLevelExperience = 85000; break;
            case 12: nextLevelExperience = 100000; break;
            case 13: nextLevelExperience = 120000; break;
            case 14: nextLevelExperience = 140000; break;
            case 15: nextLevelExperience = 165000; break;
            case 16: nextLevelExperience = 195000; break;
            case 17: nextLevelExperience = 225000; break;
            case 18: nextLevelExperience = 265000; break;
            case 19: nextLevelExperience = 305000; break;
            case 20: nextLevelExperience = 335000; break;
        }
        return  nextLevelExperience;
    },
    getStatPoints: function() {
        return this._statPoints;
    },
    setStatPoints: function(statPoints) {
        this._statPoints = statPoints;
    },
    getStatOptions: function() {
        return this._statOptions;
    },
    giveExperience: function(points) {
        var statPointsGained = 0;
        var levelsGained = 0;
        // Loop until we've allocated all points.
        while (points > 0) {
            // Check if adding in the points will surpass the level threshold.
            if (this._experience + points >= this.getNextLevelExperience()) {
                // Fill our experience till the next threshold.
                var usedPoints = this.getNextLevelExperience() - this._experience;
                points -= usedPoints;
                this._experience += usedPoints;
                // Level up our entity!
                this._level++;
                levelsGained++;
                this._statPoints += this._statPointsPerLevel;
                statPointsGained += this._statPointsPerLevel;
            } else {
                // Simple case - just give the experience.
                this._experience += points;
                points = 0;
            }
        }
        // Check if we gained at least one level.
        if (levelsGained > 0) {
            Game.sendMessage(this, "You advance to level %d.", [this._level]);
            this.raiseEvent('onGainLevel');
        }
    },
    listeners: {
        onKill: function(victim) {
            
            // New Code for experience.  Not really tested yet
            var CR = victim.getChallengeRating();
            var characterLevel = this.getLevel()
            var exp = 0;
            
            // Only give XP if level vs. CR is not 7 or more
            if (characterLevel - CR <= 6) { 
                exp = 300 * characterLevel * Math.pow(2, ((CR - characterLevel) * 0.5));
            }             
            if (exp > 0) {
                this.giveExperience(exp);
            }
        },
        details: function() {
            return [{key: 'level', value: this.getLevel()}];
        }
    }
};
            //OLD JUNK THAT GOES ABOVE "if (exp > 0) {""
            // var exp = victim.getMaxHp() + victim.getDefenseValue();
            // if (victim.hasMixin('Attacker')) {
            //     exp += victim.getAttackValue();
            // }
            // // Account for level differences
            // if (victim.hasMixin('ExperienceGainer')) {
            //     exp -= (this.getLevel() - victim.getLevel()) * 3;
            // }

            // Only give experience if more than 0.

Game.EntityMixins.RandomStatGainer = {
    name: 'RandomStatGainer',
    groupName: 'StatGainer',
    listeners: {
        onGainLevel: function() {
            var statOptions = this.getStatOptions();
            // Randomly select a stat option and execute the callback for each
            // stat point.
            while (this.getStatPoints() > 0) {
                // Call the stat increasing function with this as the context.
                statOptions.random()[1].call(this);
                this.setStatPoints(this.getStatPoints() - 1);
            }
        }
    }
};

Game.EntityMixins.PlayerStatGainer = {
    name: 'PlayerStatGainer',
    groupName: 'StatGainer',
    listeners: {
        onGainLevel: function() {
            // Setup the gain stat screen and show it.
            Game.Screen.gainStatScreen.setup(this);
            Game.Screen.playScreen.setSubScreen(Game.Screen.gainStatScreen);
        }
    }
};