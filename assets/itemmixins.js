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
        this._wearable = template['legPart'] || false;
        this._wearable = template['armPart'] || false;
        this._wearable = template['torsoPart'] || false;
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
    isArm: function() {
        return this.armPart;
    },
    isLeg: function() {
        return this.legPart;
    },
    isTorso: function() {
        return this.torsoPart;
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
        // PRETTY SURE THIS DOES NOT WORK
        // THE PROBLEM IS MULTIPLE BODY PART SLOTS>>>>>
        'details': function() {
            var results = [];
            if (this._armPart) {
                results.push({key: 'attack', value: this.getAttackValue()});
            }
            if (this._torsoPart) {
                results.push({key: 'defense', value: this.getDefenseValue()});
            }
            return results;
        }
    }
};