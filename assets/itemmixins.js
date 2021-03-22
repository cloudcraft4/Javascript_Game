Game.ItemMixins = {};



// Edible mixins
Game.ItemMixins.Edible = {
    name: 'Edible',
    init: function(template) {
        // Number of points to add to hunger
        this._foodValue = template['foodValue'] || 5;
        // Number of times the item can be consumed
        this._maxConsumptions = template['consumptions'] || 1;
        this._remainingConsumptions = this._maxConsumptions;
    },
    eat: function(entity) {
        if (entity.hasMixin('FoodConsumer')) {
            if (this.hasRemainingConsumptions()) {
                entity.modifyFullnessBy(this._foodValue);
                this._remainingConsumptions--;
            }
        }
    },
    hasRemainingConsumptions: function() {
        return this._remainingConsumptions > 0;
    },
    describe: function() {
        if (this._maxConsumptions != this._remainingConsumptions) {
            return 'partly eaten ' + Game.Item.prototype.describe.call(this);
        } else {
            return this._name;
        }
    },
    listeners: {
        'details': function() {
            return [{key: 'food', value: this._foodValue}];
        }
    }
};

// Equipment mixins
Game.ItemMixins.Equippable = {
    name: 'Equippable',
    init: function(template) {
        this._attackValue = template['attackValue'] || 0;
        this._defenseValue = template['defenseValue'] || 0;
        // Attributes that can be added to item
        this._bodyPart = template['bodyPart'] || false;
        this._description = template['description'] || 'Description Missing';
        // Number of times the item can be used
        this._maxUses = template['maxUses'] || 1;
        this._onUse = template['onUse'] || false;
        //This is something that I need to properly impliment.  Whenever the item
        //is attached to a entity on creation this should be set (NOT DONE YET)
        //It also needs to be set on equipping (already done but not tested)
        this._owner = false;
    },

    //LIKELY NOT WORKING YET...  Game.Screen.playScreen not sure about
    //Also unlock happens right after doing OK function.  Is that ok?
    chooseTarget: function() {
        let offsets = Game.Screen.getScreenOffsets();
        let player = Game.Screen.playScreen._player;
        Game.Screen.chooseScreen.setup(player,
            player.getX(), player.getY(),
            offsets.x, offsets.y);
        let target = Game.Screen.playScreen.setSubScreen(Game.Screen.chooseScreen);
        return target; 
    },    
    getOwner: function() {
        return this._owner;                 
    },
    getAttackValue: function() {
        return this._attackValue;                 
    },
    getDefenseValue: function() {
        return this._defenceValue;
    },
    getDescription: function() {
        return this._description;
    },
    getPart: function() {
        return this._bodyPart
    },
    useAbility: function() {
        if (this._onUse) {
            switch (this._onUse) {
                case 'heal': 
                    this.heal(); 
                    this.checkUses();
                    break;
                case 'rangedAttack':
                    let targetPosition = this.pickTarget();
                    console.log('Congradulations you have made it to rangedAttack')
                    this.damageTarget(targetPosition);
                    this.checkUses();
                    break;
                default: console.log(this._onUse + ' not found in switch');
            }
        } else {console.log('This item does not have an ability')}
    },
    //Check to see if item has uses left.  If not remove and replace with default
    //THIS DOES NOT WORK YET>>>  ITEM & ENTITY NOT DEFINED
    //ALSO HEAL DUPLICATES THIS SO DELETE IT
    checkUses: function() {
        let entity = this._owner;
        console.log('checkUses was called');
        if (this.hasRemainingUses() <= 0) {
            entity.removePart(this);
        }
    },
    listeners: {
        'details': function() {
            var results = [];
            // I THINK this works.  Have not tested much yet
            // Not totally sure I need the 'attackValue != 0' part
            if (this._bodyParts) {
                let bodyParts = this._bodyParts;
                let attackValue = 0;
                let defenceValue = 0;
                for (i = 0; i < bodyParts.length; i++) {
                    attackValue += bodyParts[i].part.getAttackValue();
                    defenceValue += bodyParts[i].part.getDefenceValue();
                };
                if (attackValue != 0) {
                    results.push({key: 'attack', value: attackValue});
                    console.log('itemmixins listeners attackValue results=' + attackValue);
                };
                if (defenceValue != 0) {
                    results.push({key: 'defense', value: defenceValue});
                    console.log('itemmixins listeners defenceValue results=' + defenceValue);
                };
            }
            return results;
        }
    }
};


// Mixins to add onto parts
Game.ItemMixins.Healing = {
    name: 'Healing',
    init: function(template) {
        this._healValue = template['healValue'] || 20;
        this._maxUses = template['uses'] || 1;
        this._remainingUses = this._maxUses;
    },
    heal: function(entity = this.getOwner()) {
        console.log(this.getOwner());
        if (entity.hasMixin('Destructible')) {
            if (this.hasRemainingUses()) {
                let currentHP = entity.getHp();
                let maxHP = entity.getMaxHp();
                //Heal entity if it has been damaged
                if (currentHP + this.healValue <= maxHP) {
                    entity.setHp(currentHP + this.healValue);
                    this._remainingUses--;
                    Game.sendMessage(entity, "Your wounds heal");
                } else if (currentHP < maxHP) {
                    entity.setHp(maxHP);
                    this._remainingUses--;
                    Game.sendMessage(entity, "Your wounds heal");
                } else {
                    Game.sendMessage(entity, "Nothing happens because you are not hurt");
                };
            }
        }
    },
    hasRemainingUses: function() {
        return this._remainingUses > 0;
    },
};

Game.ItemMixins.rangedAttack = {
    name: 'rangedAttack',
    init: function(template) {
        this._rangedDamage = template['rangedDamage'] || 20;
        this._areaSize = template['areaSize'] || false;
        //Not sure what this was going to be for...
            //this._sizeDamageReduction = template['sizeDamageReduction'] || 0;
        this._beam = template['beam'] || false;
        this._maxUses = template['uses'] || 1;
        this._remainingUses = this._maxUses;
        this._piercing = template['piercing'] || false;
    },
    pickTarget: function(entity) {
        
        //Allow user to target enemy
        let targetPosition = [];
        if (this.hasRemainingUses()) {
            //Set up the screen to choose the target position
            let player = Game.Screen.playScreen._player;
            let program = Game.Screen;
            let offsets = program.playScreen.getScreenOffsets();
            program.chooseScreen.setup(player,
                player.getX(), player.getY(),
                offsets.x, offsets.y);
            program.playScreen.setSubScreen(program.chooseScreen);
        }
        return targetPosition;

    },
    damageTarget: function(targetPosition) {
        //targetPosition is an object = {targetX:x, targetY:y}
        let targetX = targetPosition.targetX;
        let targetY = targetPosition.targetY;
        let target = this.getEntityAt(targetX, targetY, Game.Screen.playScreen._player.getZ());
        if (Boolean(target)) {
            //The order of this is bad...  Here I damage target first then
            //do thing to area.  I should not bother with this I think?
            let message = 'shoot a fireball at';
            this.attack(target, message);

            //I NEED TO Create getAreaSize() METHOD!!!!!!!!!!!!!!!!!!!
        if (this.getAreaSize()) {
            let areaSize = this.getAreaSize();
            for (let xPos = 0; xPos < areaSize; xPos++) {
                let xTarget = targetPosition.x - (xPos - this.areaSize);
                for (let yPos = 0; yPos < this.areaSize; yPos++) {
                    let areaY = targetY - (yPos - areaSize);
                    //Checks to make sure we are not dealing double damage
                    if (areaX !== targetX && 
                        areaY !== targetY) {
                        //Attempts to do damage to target entity
                        if (this.getEntityAt(areaX, areaY, this._player.getZ())) {
                            targetEntity = this.getEntityAt(areaX, areaY, this._player.getZ()));
                            this.attack(targetEntity, message);
                        }
                    }
                }
            }
        }
            //I NEED TO Create this GETTER METHOD????
            if (this.isBeam()) {
                // damage things in a beam
            }
        }
        //Does this even work?? The ! part
        if (!Boolean(target) && !this.getAreaSize() && !this.isBeam()) {
            //message about hitting nothing
        }
    },
    hasRemainingUses: function() {
        return this._remainingUses > 0;
    },
};