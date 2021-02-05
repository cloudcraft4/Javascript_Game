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
        this._range = template['range'] || 0;
        this._bodyPart = template['bodyPart'] || false;
        this._beam = template['beam'] || false;
        this._aoe = template['aoe'] || false;
        this._description = template['description'] || 'Description Missing';
        // Number of times the item can be used
        this._maxUses = template['uses'] || 1;
        this._remainingUses = this._maxUses;
    },
    getAttackValue: function() {
        return this._attackValue;                 
    },
    getDefenseValue: function() {
        return this._defenceValue;
    },
    getRange: function() {
        return this._range;
    },
    getDescription: function() {
        return this._description;
    },
    getPart: function() {
        return this._bodyPart
    },
    isBeam: function() {
        return this._beam;
    },
    isAoe: function() {
        return this._aoe;
    },
    hasRemainingConsumptions: function() {
        return this._remainingConsumptions > 0;
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