Game.ItemRepository = new Game.Repository('items', Game.Item);

Game.ItemRepository.define('apple', {
    name: 'apple',
    character: '%',
    foreground: 'red',
    foodValue: 100,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('melon', {
    name: 'melon',
    character: '%',
    foreground: 'lightGreen',
    foodValue: 70,
    consumptions: 2,
    mixins: [Game.ItemMixins.Edible]
});

Game.ItemRepository.define('corpse', {
    name: 'corpse',
    character: '%'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('rock', {
    name: 'rock',
    character: '*',
    foreground: 'white'
});

// Weapons
Game.ItemRepository.define('large claw', {
    name: 'large claw',
    character: ')',
    foreground: 'gray',
    attackValue: 5,
    armPart: true,
    mixins: [Game.ItemMixins.Equippable],
    description: 'This default arm is used whenever you don\'t have a better option.'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('blade arm', {
    name: 'blade arm',
    character: ')',
    foreground: 'white',
    attackValue: 10,
    armPart: true,
    maxUses: 10,
    mixins: [Game.ItemMixins.Equippable],
    description: 'Deals medium damage to adjacent creatures.  Breaks after ten uses.'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('staff arm', {
    name: 'staff arm',
    character: ')',
    foreground: 'yellow',
    attackValue: 5,
    defenseValue: 3,
    armPart: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

// Wearables
Game.ItemRepository.define('tunic torso', {
    name: 'tunic torso',
    character: '[',
    foreground: 'green',
    defenseValue: 2,
    torsoPart: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('chainmail torso', {
    name: 'chainmail torso',
    character: '[',
    foreground: 'white',
    defenseValue: 4,
    torsoPart: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('platemail torso', {
    name: 'platemail torso',
    character: '[',
    foreground: 'aliceblue',
    defenseValue: 6,
    torsoPart: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('default leg', {
    name: 'default leg',
    character: '{',
    foreground: 'aliceblue',
    defenseValue: 1,
    legPart: true,
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});
