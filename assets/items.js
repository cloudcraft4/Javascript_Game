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
Game.ItemRepository.define('default arm', {
    name: 'default arm',
    character: ')',
    foreground: 'gray',
    attackValue: 0,
    bodyPart: 'arm',
    mixins: [Game.ItemMixins.Equippable],
    description: 'This default arm is used whenever you don\'t have a better option.'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('default leg', {
    name: 'default leg',
    character: ')',
    foreground: 'gray',
    attackValue: 0,
    bodyPart: 'leg',
    mixins: [Game.ItemMixins.Equippable],
    description: 'This default arm is used whenever you don\'t have a better option.'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('default torso', {
    name: 'default torso',
    character: ')',
    foreground: 'gray',
    defenseValue: 0,
    bodyPart: 'torso',
    mixins: [Game.ItemMixins.Equippable],
    description: 'This default arm is used whenever you don\'t have a better option.'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('large claw', {
    name: 'large claw',
    character: ')',
    foreground: 'gray',
    attackValue: 5,
    bodyPart: 'arm',
    mixins: [Game.ItemMixins.Equippable],
    description: 'This default arm is used whenever you don\'t have a better option.'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('regenerating arm', {
    name: 'regenerating arm',
    character: ')',
    foreground: 'white',
    attackValue: 10,
    bodyPart: 'arm',
    healValue: 20,
    onUse: 'heal',
    maxUses: 1,
    mixins: [Game.ItemMixins.Healing, Game.ItemMixins.Equippable],
    description: 'Deals medium damage.  One time healing use.'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('staff arm', {
    name: 'staff arm',
    character: ')',
    foreground: 'yellow',
    attackValue: 5,
    defenseValue: 3,
    bodyPart: 'arm',
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
    bodyPart: 'torso',
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('chainmail torso', {
    name: 'chainmail torso',
    character: '[',
    foreground: 'white',
    defenseValue: 4,
    bodyPart: 'torso',
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('platemail torso', {
    name: 'platemail torso',
    character: '[',
    foreground: 'aliceblue',
    defenseValue: 6,
    bodyPart: 'torso',
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('default leg', {
    name: 'default leg',
    character: '{',
    foreground: 'aliceblue',
    defenseValue: 1,
    bodyPart: 'leg',
    mixins: [Game.ItemMixins.Equippable]
}, {
    disableRandomCreation: true
});
