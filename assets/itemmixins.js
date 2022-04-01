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
        this._attackRoll = template['attackRoll'] || 0;
        this._defenseRoll = template['defenseRoll'] || 0;
        this._weaponClass = template['weaponClass'] || false;
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
        this._maxCoolDown = template['maxCoolDown'] || false;
        this._currentCoolDown = template['currentCoolDown'] || false;
    },

    getOwner: function() {
        return this._owner;                 
    },
    getAttackRoll: function() {
        return this._attackRoll;                 
    },
    getDefenseRoll: function() {
        return this._defenceRoll;
    },
    getDescription: function() {
        return this._description;
    },
    getWeaponClass: function() {
        return this._weaponClass;
    },
    getPart: function() {
        return this._bodyPart
    },

    //Check to see if item has uses left.  If not remove and replace with default
    checkUses: function() {
        let entity = this._owner;
        if (this.hasRemainingUses() <= 0) {
            entity.removePart(this);
        }
    },
    listeners: {
        'details': function() {
            var results = [];
            // I THINK this works.  Have not tested much yet
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
                    Game.sendMessage(entity, "You do not heal because you are not hurt");
                };
            }
        }
    },
    hasRemainingUses: function() {
        return this._remainingUses > 0;
    },
};

//Direct damage is small but area damage is huge.  The reason is that it
//Is using hitting damage for target hit but ability damage for area
//MAYBE THIS IS TRUE???  NOT SURE NEED TO LOOK AT IT

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
        let player = Game.Screen.playScreen._player;
        let areaSize = this.getAreaSize();
        let map = player.getMap();
 
        //NOTE:  This does not damage target!

        //Calculate positions around target.  areaSize of 1 = one in
        //every direction for a total of nine spots.
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
                        let message = 'the exposion also hit';
                        let cause = 'explosion';
                        player.attack(targetEntity, message, cause);
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
            let item = this;
            Game.Screen.chooseScreen.setup(player,
                player.getX(), player.getY(),
                offsets.x, offsets.y, afterTargeting, item);
            Game.Screen.playScreen.setSubScreen(Game.Screen.chooseScreen);
        }
    },

    damageTarget: function(targetX, targetY) {
        //targetPosition is an object = {targetX:x, targetY:y}
        let player = Game.Screen.playScreen._player;
        let map = player.getMap();
        let target = map.getEntityAt(targetX, targetY, player.getZ());
        
        if (Boolean(target)) {
            //Do damage to target first in case damage amount is different
            //However at the present we do not consider strength of part
            let message = 'shoot a fireball at';
            player.attack(target, message);
        }
        if (this.getAreaSize()) {
            let areaSize = this.getAreaSize();

            //Duplicate of effectArea
            //May want add all to a more generic attack group
            for (let xPos = 0; xPos <= (areaSize * 2); xPos++) {
                let areaX = targetX - (xPos - areaSize); 
                for (let yPos = 0; yPos <= (areaSize * 2); yPos++) { 
                    let areaY = targetY - (yPos - areaSize);
                    //Checks to make sure we are not dealing double damage
                    if (areaX !== targetX && 
                        areaY !== targetY) {
                        //Attempts to do damage to target entity
                        if (map.getEntityAt(areaX, areaY, player.getZ())) {
                            let targetEntity = map.getEntityAt(areaX, areaY, player.getZ());
                            let message = 'the exposion also hit';
                            let cause = 'explosion';
                            player.attack(targetEntity, message, cause);
                        }
                    }
                }
            }
        }
        //Damage everything in a line.  Currently unused
        if (this.isBeam()) {
            // damage things in a beam
            console.log('This is a beam but there is no code')
        }
     },
 
     hasRemainingUses: function() {
        return this._remainingUses > 0;
    },
};