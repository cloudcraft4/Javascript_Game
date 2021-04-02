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
        // Let the item know what entity has it installed.
        // This is set on equipping and creation.
        // There may be a few instances on creation where this is not set yet!!
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

    /*  NO LONGER APPLICABLE.  LEAVING THIS HERE UNTIL NEW WAY TESTED

    useAbility: function() {
        if (this._onUse) {
            switch (this._onUse) {
                case 'heal': 
                    this.heal(); 
                    this.checkUses();
                    break;
                case 'rangedAttack':
                    //This is what needs to happen after choosing target
                    let afterTargeting = function() {
                        this.damageTarget(targetPosition);
                        this.checkUses();
                    };
                    //
                    //  WORKING ON THIS WHEN I AM NOT BORED OF IT
                    //
                    //this.pickTarget(afterTargeting);
                    break;
                default: console.log(this._onUse + ' not found in switch');
            }
        } else {console.log('This item does not have an ability')}
    },
    */

    //Check to see if item has uses left.  If not remove and replace with default
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

//THIS IS NOT TESTED YET!!!
//WHEN THIS IS WORKING WE WILL NEED TO TAKE IT OUT OF rangedAttack

//MAYBE I WANT TO COLLECT ALL DAMAGE STUFF INTO ONE THING???
//RANGED WOULD BE A BIG EXCEPTION THOUGH CUZ ITS WEIRD
Game.ItemMixins.areaEffect = {
    name: 'areaEffect',
    init: function(template) {
        this._areaSize = template['areaSize'] || 1;
        this._abilityDamage = template['abilityDamage'] || 20;        
    },
    getAreaSize: function() {
        return this._areaSize;                 
    },
    //I will want to eventually overhaul this to make it just find
    //everyone in area and do SOMETHING to them.  For various
    //AOE effects.
    effectArea: function(targetX, targetY) {
        let areaSize = this.getAreaSize();
    
        //Calculate positions around target.  areaSize of 1 = one in
        //every direction for a total of nine spots.
        //I MIGHT want to eventually make it round rather than square.

        //NOTE:  This does not damage target!

        for (let xPos = 0; xPos <= (areaSize * 2); xPos++) {
            let areaX = targetX - (xPos - areaSize); 
            for (let yPos = 0; yPos <= (areaSize * 2); yPos++) { 
                let areaY = targetY - (yPos - areaSize);
                //Checks to make sure we are not dealing double damage
                if (areaX !== targetX && 
                    areaY !== targetY) {
                    //Attempts to do damage to target entity
                    if (map.getEntityAt(areaX, areaY, player.getZ())) {
                        targetEntity = map.getEntityAt(areaX, areaY, player.getZ());
                        this.attack(targetEntity, message);
                        //CHECK IF CREATURE DIES AND THEN CHECK OTHER HEALING
                    }
                }
            }
        }
    },
}

Game.ItemMixins.rangedAttack = {
    name: 'rangedAttack',
    init: function(template) {
        this._abilityDamage = template['abiltyDamage'] || 20;
        this._areaSize = template['areaSize'] || false;
        //Not sure what this was going to be for...
            //this._sizeDamageReduction = template['sizeDamageReduction'] || 0;
        this._beam = template['beam'] || false;
        this._maxUses = template['uses'] || 1;
        this._remainingUses = this._maxUses;
        this._piercing = template['piercing'] || false;
    },
    getAreaSize: function() {
        return this._areaSize;                 
    },
    isBeam: function() {
        return this._beam;                 
    },
    pickTarget: function(afterTargeting) {
        
        //Allow user to target enemy
        //let targetPosition = [];
        if (this.hasRemainingUses()) {
            //Set up the screen to choose the target position
            let player = Game.Screen.playScreen._player;
            let offsets = Game.Screen.playScreen.getScreenOffsets();
            Game.Screen.chooseScreen.setup(player,
                player.getX(), player.getY(),
                offsets.x, offsets.y, afterTargeting);
            Game.Screen.playScreen.setSubScreen(Game.Screen.chooseScreen);
        }

        //This needs to return the coordinates but it is not
    },

    damageTarget: function(targetPosition) {
        //targetPosition is an object = {targetX:x, targetY:y}
        let targetX = targetPosition.targetX;
        let targetY = targetPosition.targetY;
        let player = Game.Screen.playScreen._player;
        let map = player.getMap();
        let target = map.getEntityAt(targetX, targetY, player.getZ());
        
        if (Boolean(target)) {
            //Do damage to target first in case damage amount is different
            //However at the present we do not consider strength of part
            let message = 'shoot a fireball at';
            this.attack(target, message);
        }
        if (this.getAreaSize()) {
            let areaSize = this.getAreaSize();
            //Calculate positions around target.  areaSize of 1 = one in
            //every direction for a total of nine spots.
            
            //I MIGHT want to eventually make it round rather than square.
            for (let xPos = 0; xPos <= (areaSize * 2); xPos++) {
                let areaX = targetX - (xPos - areaSize); 
                for (let yPos = 0; yPos <= (areaSize * 2); yPos++) { 
                    let areaY = targetY - (yPos - areaSize);
                    //Checks to make sure we are not dealing double damage
                    if (areaX !== targetX && 
                        areaY !== targetY) {
                        //Attempts to do damage to target entity
                        if (map.getEntityAt(areaX, areaY, player.getZ())) {
                            targetEntity = map.getEntityAt(areaX, areaY, player.getZ());
                            this.attack(targetEntity, message);
                        }
                    }
                }
            }
        }
        //I NEED TO Create this GETTER METHOD????
        if (this.isBeam()) {
            // damage things in a beam
            console.log('This is a beam but there is no code')
        }
        
        //Does this even work?? The ! part
        //Also do I need the Boolean() part? 
        /*
        if (!Boolean(target) && !this.getAreaSize() && !this.isBeam()) {
            //message about hitting nothing
            console.log('Nothing happened')
        }
        */
    },
    hasRemainingUses: function() {
        return this._remainingUses > 0;
    },
};