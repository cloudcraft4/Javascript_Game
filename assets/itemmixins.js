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
                case 'heal': this.heal(); break;
                default: console.log(this._onUse + ' not found in switch');
            }
        } else {console.log('This item does not have an ability')}
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
                currentHP = entity.getHp();
                entity.setHp(currentHP + this.healValue);
                this._remainingUses--;
            }
            //Destroy item if no more uses
            if (this.hasRemainingUses() < 1) {
                //Does this work?  What is "this"
                entity.removeItem(this);
            }
        }
    },
    hasRemainingUses: function() {
        return this._remainingUses > 0;
    },
};

//IS THIS A GOOD IDEA OR ADD TO BASIC ATTACK???????
Game.ItemMixins.rangedAttack = {
    name: 'rangedAttack',
    init: function(template) {
        this._rangedDamage = template['rangedDamage'] || 20;
        this._areaSize = template['areaSize'] || 0;
        this._sizeDamageReduction = template['sizeDamageReduction'] || 0;
        this._beam = template['beam'] || false;
        this._maxUses = template['uses'] || 1;
        this._remainingUses = this._maxUses;
        // I have not implimented this yet
        this._piercing = template['piercing'] || false;
    },
    pickTarget: function(entity) {
        //Allow user to target enemy
        //NEED TO CALCULATE IF BLOCKED (OR PIERCING)
        let targetPosition = [];
        if (this.hasRemainingUses()) {
            //screen.js getScreenOffsets not sure what it does but this is
            //a normal part of calling this program.  It is part of PlayScreen.
            //It seems to be part of making sure the there is not too much rendered
            //to screen or something.
            let offsets = this.getScreenOffsets();
            Game.Screen.chooseScreen.setup(this._player,
                this._player.getX(), this._player.getY(),
                offsets.x, offsets.y);
            this.setSubScreen(Game.Screen.lookScreen);
            // MODIFY TargetBasedScreen and get new okFunction
        }
        //ALL THAT HAPPENS IS SHOWING SCREEN.  NO CODE FOR CHOOSING!!!!!!
        return targetPosition;
    },
    //This is probably close to working. NOT TESTED
    damageTarget: function(targetPosition) {
        if (targetPosition = entity) {
            target = targetPosition
            let message = 'shoot a fireball at';
            this.attack(target, message);
            // Damage everything in an area if attack has areaSize
            // CODE Game.getNeighborPositions in Tile DOES THIS ALREADY.  But
            // ONly for direct neightbors
            if (this.areaSize) {
                for (let xPos = 0; xPos < this.areaSize; xPos++) {
                    let xTarget = targetPosition.x - (xPos - this.areaSize);
                    for (let yPos = 0; yPos < this.areaSize; yPos++) {
                        let yTarget = targetPosition.y - (yPos - this.areaSize);
                        //Checks to make sure we are not dealing double damage
                        if (xTarget !== targetPosition.x && 
                            yTarget !== targetPosition.y) {
                            //Attempts to do damage to target entity
                            if (this.getEntityAt(xTarget, yTarget, this._player.getZ())) {
                                targetEntity = this.getEntityAt(xTarget, yTarget, this._player.getZ());
                                this.attack(targetEntity, message);
                            }
                        }
                    }
                }
            }
            if (this.beam) {
                // damage things in a beam
            }
        }
    },
    hasRemainingUses: function() {
        return this._remainingUses > 0;
    },
};