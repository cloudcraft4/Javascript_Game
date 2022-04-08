Game.raceMixins = {};

// Doing it this way requires that I pick race after choosing stats
// This is probably less than ideal but I can fix it later

// Mixins for races
Game.raceMixins.Dwarf = {
    name: 'Dwarf',
    init: function() {
        this._size = 'medium';
        this._constitution += 2;
        this._speed = 25;
        this._proficiencies['battleaxe'] = true;
        this._proficiencies['handaxe'] = true;
        this._proficiencies['light hammer'] = true;
        this._proficiencies['warhammer'] = true;
        this._savingThrows['poison'] = true;
        this._resistances['poison'] = true;
    },
};
    /*
    Speed. 
        Your speed is not reduced by wearing heavy armor.
    Darkvision.
        You can see in dim light within 60 feet of you as if it were bright light,
        and in darkness as if it were dim light. You can’t discern
        color in darkness, only shades of gray.
    Tool Proficiency. 
        You gain proficiency with the artisan’s tools of your choice: smith’s tools, brewer’s supplies,
        or mason’s tools.
    Stonecunning. 
        Whenever you make an Intelligence (History) check related to the origin of stonework, you are
        considered proficient in the History skill and add double your proficiency bonus to the check, instead 
        of your normal proficiency bonus.
    */

Game.raceMixins.hillDwarf = {
    name: 'Hill Dwarf',
    //This Mixin has to be added after Destructable!
    init: function() {
        this._wisdom += 1;
        this._maxHP += 1;
        //Making sure that charater starts at full health.
        this._hp += 1;
        this._bonusHPOnLevelUp += 1;
    },
};

Game.raceMixins.mountainDwarf = {
    name: 'Mountain Dwarf',
    init: function() {       
        this._strength += 1;        
        this._proficiencies['light armor'] = true;
        this._proficiencies['medium armor'] = true;
    },
};

Game.raceMixins.Elf = {
    name: 'Elf',
    init: function() {
        this._size = 'medium';        
        this._dexterity += 2;
        this._speed = 30;
        this._proficiencies['perception'] = true;
        this._savingThrows['charm'] = true;
        this._immunities['magical-sleep'] = true;
    },
};
    /*
    Darkvision. 
        You can see in dim light within 60 feet of you as if it were
        bright light, and in darkness as if it were dim light. You
        can’t discern color in darkness, only shades of gray.
    */

Game.raceMixins.highElf = {
    name: 'High Elf',
    init: function() {   
        this._intellegence += 1;
        this._proficiencies['longsword'] = true;
        this._proficiencies['shortsword'] = true;
        this._proficiencies['shortbow'] = true;
        this._proficiencies['longbow'] = true;
    },
};
    /*
    Cantrip. 
        You know one cantrip of your choice from the wizard spell list. 
        Intelligence is your spellcasting ability for it.
    Extra Language. 
        You can speak, read, and write one extra language of your choice.
    */

Game.raceMixins.woodElf = {
    name: 'Wood Elf',
    init: function() {       
        this._wisdom += 1;       
        this._proficiencies['longsword'] = true;
        this._proficiencies['shortsword'] = true;
        this._proficiencies['shortbow'] = true;
        this._proficiencies['longbow'] = true;        
        this._speed = 35;
    },
};
    /*
    Mask of the Wild. 
        You can attempt to hide even when you are only lightly obscured by foliage,
        heavy rain, falling snow, mist, and other natural phenomena
    */

Game.raceMixins.Halfling = {
    name: 'Halfling',
    init: function() {
        this._size = 'small';        
        this._dexterity += 2;
        this._speed = 25;        
        this._savingThrows['fear'] = true;
    },
};
    /*
    Lucky. 
        When you roll a 1 on the d20 for an attack roll, ability check, 
        or saving throw, you can reroll the die and must use the new roll.
    Halfling Nimbleness. 
        You can move through the space of any creature that is of a size larger than yours
    */

Game.raceMixins.lightfootHalfling = {
    name: 'Lightfoot Halfling',
    init: function() {       
        this._charisma += 1;
    },
};
    /*
    Naturally Stealthy. 
        You can attempt to hide even when you are obscured only by a creature that is at least one
        size larger than you.
    */

Game.raceMixins.stoutHalfling = {
    name: 'Stout Halfling',
    init: function() {      
        this._constitution += 1;
        this._savingThrows['poison'] = true;
        this._resistances['poison'] = true;
    },
};

Game.raceMixins.human = {
    name: 'Human',
    init: function() {     
        this._size = 'medium';
        this._strength += 1;
        this._dexterity += 1;
        this._constitution += 1;
        this._intellegence += 1;
        this._wisdom += 1;
        this._charisma += 1;
        this._strength += 1;
        this.speed = 30;
    },
};

    /*
    Variant Human Traits
        If your campaign uses the optional feat rules from chapter 6
        of the Player’s Handbook, your Dungeon Master might allow
        these variant traits, all of which replace the human’s Ability
        Score Increase trait.
        Ability Score Increase. Two different ability scores of your
        choice increase by 1.
        Skills. You gain proficiency in one skill of your choice.
        Feat. You gain one feat of your choice.
    */
