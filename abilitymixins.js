//ADD THIS TO ITEMMIXINS???????????????????????

Game.AbilityMixins = {};

// Mixins to add onto parts
Game.AbilityMixins.Healing = {
    name: 'Healing',
    init: function(template) {
        this._healValue = template['healValue'] || 20;
        this._maxUses = template['uses'] || 1;
        this._remainingUses = this._maxUses;
    },
    heal: function(entity) {
        if (entity.hasMixin('Destructible')) {
            if (this.hasRemainingUses()) {
                currentHP = entity.getHp();
                entity.setHp(currentHP + this.healValue);
                this._remainingUses--;
            }
        }
    },
    hasRemainingUses: function() {
        return this._remainingUses > 0;
    },
};

//IS THIS A GOOD IDEA OR ADD TO BASIC ATTACK???????
Game.AbilityMixins.rangedAttack = {
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
        let targetPosition = [],
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
                                targetEntity = this.getEntityAt(xTarget, yTarget, this._player.getZ();
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
