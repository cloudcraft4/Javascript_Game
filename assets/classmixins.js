Game.classMixins = {};

// Mixins for classes
Game.classMixins.Fighter = {
    name: 'Fighter',
    init: function() {
        this._hitDice = '1d10 per level';
        this._startingHP = 10 + "constitution_modifier";
        this._levelingHP = '1d10 (or 6)' + 'constitution_modifier';
    secondWind: function(user) {
        if (this._uses > 0) {
            user._hp += '1d10 + level'
            this._uses -= 1;
        }
    actionSurge: function(user) {
        if (this._uses > 0) {
            // "Extra move that is at instance speed basically"
            // double your speed for a little bit maybe
            this._uses -= 1;
        }
    extraAttack: function(user) {
        // Always attack twice
        }
    indomidable: function(user) {
        if (this._uses > 0) {
            // reroll a saving throw that you fail...  not very good move for a computer.  Maybe add
            // percentage or something to saving rolls.
            this._uses -= 1;
        }
    },
};

// Mixins for classes
Game.classMixins.Wizard = {
    name: 'Wizard',
    init: function() {
        this._hitDice = '1d6 per level';
        this._startingHP = 6 + "constitution_modifier";
        this._levelingHP = '1d6 (or 4)' + 'constitution_modifier';
    spellMastery: function(user) {
        //
        }
    signatureSpells: function(user) {
        //
        }
    learnSpell: function(user) {
        // 
        }
    },
};

