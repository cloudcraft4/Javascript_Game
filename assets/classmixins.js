Game.classMixins = {};

//Nothing here is tested!!!!!!!!!!!!!!!!!!!!!!!!!

// Mixins for classes
Game.classMixins.Fighter = {
    name: 'Fighter',
    //Make sure the entity is passed along when this is added!!!
    init: function(entity) {
        this._owner = entity;
            let constitution = entity.getConstitution();
            let constitutionModifer = entity.getModifer(constitution);
        this._hitDice = entity.rollDice(10) + entity.getLevel();
        this._startingHP = 10 + constitutionModifer;
        this._levelingHP = entity.rollDice(10) + constitutionModifer;
        // this._startingGear = 
        // You are supposed to be able to choose starting gear at creation.  Not sure if I want to bother.
        // this._proficiencies = ["allArmor", "simpleWeapons", "martialWeapons"];
        // this._savingThrows = ['strength', 'constitution'];
    getOwner: function() {
        return this._owner
        }
    secondWind: function(user) {
        if (this._uses > 0) {
            var owner = getOwner();
            owner._hp += owner.rollDice(10) + owner.getLevel();
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
    init: function(entity) {
        this._owner = entity;
            let constitution = entity.getConstitution();
            let constitutionModifer = entity.getModifer(constitution);
        this._hitDice = entity.rollDice(6) + entity.getLevel();
        this._startingHP = 6 + constitutionModifer;
        this._levelingHP = entity.rollDice(6) + constitutionModifer;
    getOwner: function() {
        return this._owner
        }
    spellMastery: function() {
    //
    }
    signatureSpells: function() {
        //
        }
    learnSpell: function() {
        // 
        }
    },
};

