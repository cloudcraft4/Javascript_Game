Game.classMixins = {};

Game.classMixins.prototype.getOwner = function() {
    return this._owner
};

Game.classMixins.prototype.rollHitDice = function() {
    //This function is used whenever you have to roll hit dice
    let entity = getOwner();
    let HDsize = entity._hitDiceSize;
    let hitDiceRoll = entity.rollDice(HDsize) + entity.getLevel();
    return hitDiceRoll;
};


//Nothing here is tested!!!!!!!!!!!!!!!!!!!!!!!!!
//Is there any instance where enemies will get classes?  If so this will maybe
//cause problems.  Things like proficiencies are not designed for non players

// Mixins for classes
Game.classMixins.Fighter = {
    name: 'Fighter',
    //Make sure the entity is passed along when this is added!!!
    //Actually I am not entirely sure that I have to do this!  It might actually
    //already know what this is...
    init: function(entity) {
        this._owner = entity;
        //This is sortof a bad way to do this because I will choose
        //class before I set up stats.  Also stats change!!!!
            let constitution = entity.getConstitution();
            let constitutionModifer = entity.getModifer(constitution);
        this._hitDiceSize = 10;
        this._startingHP = 10 + constitutionModifer;
        this._levelingHP = entity.rollDice(10) + constitutionModifer;
        // this._startingGear = 
        // You are supposed to be able to choose starting gear at creation.  Not sure if I want to bother.

        this._proficiencies.push("allArmor", "simpleWeapons", "martialWeapons");
        this._savingThrows.push('strength', 'constitution');
    },


    //I am thinking that this here has the formula for how the abilities work.  However there will be a
    //list somewhere that has the abilities that you actually have located on player I guess.
    // I am not really sure how this works yet.

    useSecondWind: function() {
        if (this._uses > 0) {
            var owner = getOwner();
            owner._hp += owner.rollDice(10) + owner.getLevel();
            this._uses -= 1;
        } else {
            console.log('You do not have any more uses of Second Wind');
        }
    },
    useActionSurge: function() {
        if (this._uses > 0) {
            // "Extra move that is at instance speed basically"
            // double your speed for a little bit maybe
            this._uses -= 1;
        } else {
            console.log('You do not have any more uses of Action Surge');
        }
    },
    // This might not even be needed because it is just an automatic thing that happens
    extraAttack: function() {
        // Always attack twice
    },
    indomidable: function() {
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
    },

    spellMastery: function() {
    //
    },
    signatureSpells: function() {
        //
        },
    learnSpell: function() {
        //        
    },
};
