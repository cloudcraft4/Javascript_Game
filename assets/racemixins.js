Game.raceMixins = {};

Game.raceMixins.prototype.getOwner = function() {
    return this._owner
};


// Doing it this way requires that I pick race after choosing stats
// This is probably less than ideal but I can fix it later

// Mixins for races
Game.raceMixins.Dwarf = {
    name: 'Dwarf',
    //Make sure the entity is passed along when this is added!!!
    init: function(entity) {
        this._owner = entity;
        this._size = 'medium';
        entity._constitution += 2;
    },
    /*
    Speed. 
        Your base walking speed is 25 feet. Your speed is not reduced by wearing heavy armor.
    Darkvision.
        You can see in dim light within 60 feet of you as if it were bright light,
        and in darkness as if it were dim light. You can’t discern
        color in darkness, only shades of gray.
    Dwarven Resilience. 
        You have advantage on saving throws against poison, and you have resistance against
        poison damage (explained in chapter 9).
    Dwarven Combat Training. You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.
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
    //Make sure the entity is passed along when this is added!!!
    init: function(entity) {
        this._owner = entity;
        entity._wisdom += 1;
    },
    /*
    Dwarven Toughness. 
        Your hit point maximum increases by 1, and it increases by 1 every time you
        gain a level.
    */

Game.raceMixins.mountainDwarf = {
    name: 'Mountain Dwarf',
    init: function(entity) {
        this._owner = entity;        
        entity._strength += 1;
    },
    /*
    Dwarven Armor Training. 
        You have proficiency with light and medium armor.
    */
   Game.raceMixins.Elf = {
    name: 'Elf',
    init: function(entity) {
        this._owner = entity;
        this._size = 'medium';        
        entity._dexterity += 2;

        //THIS IS NOT CORRECT AND IS NOT WORKING>>>  BUT ITS SOMETHING LIKE THIS.  LOOK AT entitymixins.js

        entity._proficiencies.push('perception')
    },
    /*
    Speed. 
        Your base walking speed is 30 feet.
    Darkvision. 
        You can see in dim light within 60 feet of you as if it were
        bright light, and in darkness as if it were dim light. You
        can’t discern color in darkness, only shades of gray.
    Fey Ancestry. 
        You have advantage on saving throws against being charmed, and magic can’t put you to sleep.
    Trance. 
        Elves don’t need to sleep. Instead, they meditate deeply, remaining semiconscious, for 4 hours a day.
        (The Common word for such meditation is “trance.”)
        While meditating, you can dream after a fashion; such dreams are actually mental exercises that have become
        reflexive through years of practice. After resting in this way, you gain the same benefit that a human does from 8
        hours of sleep.
    */

Game.raceMixins.highElf = {
    name: 'High Elf',
    init: function(entity) {
        this._owner = entity;        
        entity._intellegence += 1;
    },
    /*
    Elf Weapon Training. 
        You have proficiency with the longsword, shortsword, shortbow, and longbow.
    Cantrip. 
        You know one cantrip of your choice from the wizard spell list. 
        Intelligence is your spellcasting ability for it.
    Extra Language. 
        You can speak, read, and write one extra language of your choice.
    */

Game.raceMixins.woodElf = {
    name: 'Wood Elf',
    init: function(entity) {
        this._owner = entity;        
        entity._wisdom += 1;
    },
    /*
    Elf Weapon Training. 
        You have proficiency with the longsword, shortsword, shortbow, and longbow.
    Fleet of Foot. 
        Your base walking speed increases to 35 feet.
    Mask of the Wild. 
        You can attempt to hide even when you are only lightly obscured by foliage,
        heavy rain, falling snow, mist, and other natural phenomena
    */

Game.raceMixins.Halfling = {
    name: 'Halfling',
    init: function(entity) {
        this._owner = entity;
        this._size = 'small';        
        entity._dexterity += 2;
    },
    /*
    Speed. 
        Your base walking speed is 25 feet.
    Lucky. 
        When you roll a 1 on the d20 for an attack roll, ability check, 
        or saving throw, you can reroll the die and must use the new roll.
    Brave. 
        You have advantage on saving throws against being frightened.
    Halfling Nimbleness. 
        You can move through the space of any creature that is of a size larger than yours
    */

Game.raceMixins.lightfootHalfling = {
    name: 'Lightfoot Halfling',
    init: function(entity) {
        this._owner = entity;        
        entity._charisma += 1;
    },
    /*
    Naturally Stealthy. 
        You can attempt to hide even when you are obscured only by a creature that is at least one
        size larger than you.
    */

Game.raceMixins.stoutHalfling = {
    name: 'Stout Halfling',
    init: function(entity) {
        this._owner = entity;        
        entity._wisdom += 1;
    },
    /*
    Elf Weapon Training. 
        You have proficiency with the longsword, shortsword, shortbow, and longbow.
    Fleet of Foot. 
        Your base walking speed increases to 35 feet.
    Mask of the Wild. 
        You can attempt to hide even when you are only lightly obscured by foliage,
        heavy rain, falling snow, mist, and other natural phenomena
    */

Game.raceMixins.human = {
    name: 'Human',
    init: function(entity) {
        this._owner = entity;        
        this._size = 'medium';
        entity._strength += 1;
        entity._dexterity += 1;
        entity._constitution += 1;
        entity._intellegence += 1;
        entity._wisdom += 1;
        entity._charisma += 1;
        entity._strength += 1;
    },
    /*
    Speed. 
        Your base walking speed is 30 feet.
    */

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
