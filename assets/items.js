Game.ItemRepository = new Game.Repository('items', Game.Item);

/*  FOOD IS NOT CURRENTLY BEING USED
Game.ItemRepository.define('melon', {
    name: 'melon',
    character: '%',
    foreground: 'lightGreen',
    foodValue: 70,
    consumptions: 2,
    mixins: [Game.ItemMixins.Edible]
});
*/

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

Game.ItemRepository.define('club', {
    name: 'club',
    class: 'simple melee',
    character: '[',
    foreground: 'white',
    diceRoll: 4,
    bodyPart: 'hand',
    weight: 2,
    damageType: 'bludgeoning',
    properties: ['light']
    mixins: [Game.ItemMixins.Equippable],
    description: 'A small branch turned into a weapon'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('dagger', {
    name: 'club',
    class: 'simple melee',
    character: '[',
    foreground: 'white',
    diceRoll: 4,
    bodyPart: 'hand',
    weight: 1,
    damageType: 'piercing',
    properties: ['finesse','light','thrown'],
    normalRange: 20,
    maxRange: 60,
    mixins: [Game.ItemMixins.Equippable],
    description: 'A simple dagger'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('greatClub', {
    name: 'Greatclub',
    class: 'simple melee',
    character: '[',
    foreground: 'white',
    diceRoll: 8,
    bodyPart: 'hand',
    weight: 10,
    damageType: 'bludgeoning',
    properties: ['twoHanded']
    mixins: [Game.ItemMixins.Equippable],
    description: 'A massive tree branch'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('handAxe', {
    name: 'Handaxe',
    class: 'simple melee',
    character: '[',
    foreground: 'white',
    diceRoll: 6,
    bodyPart: 'hand',
    weight: 2,
    damageType: 'slashing',
    properties: ['light','thrown'],
    normalRange: 20,
    maxRange: 60,
    mixins: [Game.ItemMixins.Equippable],
    description: 'A simple axe that can be thrown'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('javelin', {
    name: 'Javelin',
    class: 'simple melee',
    character: '[',
    foreground: 'white',
    diceRoll: 6,
    bodyPart: 'hand',
    weight: 2,
    damageType: 'piercing',
    properties: ['thrown'],
    normalRange: 30,
    maxRange: 120,
    mixins: [Game.ItemMixins.Equippable],
    description: 'A simple axe that can be thrown'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('lightHammer', {
    name: 'Light Hammer',
    class: 'simple melee',
    character: '[',
    foreground: 'white',
    diceRoll: 4,
    bodyPart: 'hand',
    weight: 2,
    damageType: 'bludgeoning',
    properties: ['light','thrown'],
    normalRange: 20,
    maxRange: 60,
    mixins: [Game.ItemMixins.Equippable],
    description: 'A small hammer that can be thrown'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('mace', {
    name: 'Mace',
    class: 'simple melee',
    character: '[',
    foreground: 'white',
    diceRoll: 6,
    bodyPart: 'hand',
    weight: 4,
    damageType: 'bludgeoning',
    mixins: [Game.ItemMixins.Equippable],
    description: 'A metal rod with a ball at the end'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('quarterStaff', {
    name: 'Quarterstaff',
    class: 'simple melee',
    character: '[',
    foreground: 'white',
    diceRoll: 6,
    bodyPart: 'hand',
    weight: 4,
    damageType: 'bludgeoning',
    versatileRoll: 8,
    mixins: [Game.ItemMixins.Equippable],
    description: 'Quarterstaff'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('sickle', {
    name: 'Sickle',
    class: 'simple melee',
    character: '[',
    foreground: 'white',
    diceRoll: 4,
    bodyPart: 'hand',
    weight: 2,
    damageType: 'slashing',
    properties: ['light'],
    mixins: [Game.ItemMixins.Equippable],
    description: 'Sickle'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('spear', {
    name: 'Spear',
    class: 'simple melee',
    character: '[',
    foreground: 'white',
    diceRoll: 6,
    bodyPart: 'hand',
    weight: 3,
    damageType: 'piercing',
    properties: ['thrown'],
    versatileRoll: 8,
    normalRange: 20,
    maxRange: 60,
    mixins: [Game.ItemMixins.Equippable],
    description: 'Spear'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('crossbowLight', {
    name: 'Crossbow, light',
    class: 'simple ranged',
    character: '[',
    foreground: 'white',
    diceRoll: 8,
    bodyPart: 'hand',
    weight: 5,
    damageType: 'piercing',
    properties: ['ammunition', 'loading', 'twoHanded'],
    normalRange: 80,
    maxRange: 320,
    mixins: [Game.ItemMixins.Equippable],
    description: 'A small crossbow'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('dart', {
    name: 'Dart',
    class: 'simple ranged',
    character: '[',
    foreground: 'white',
    diceRoll: 4,
    bodyPart: 'hand',
    weight: .25,
    damageType: 'piercing',
    properties: ['finess', 'thrown'],
    normalRange: 20,
    maxRange: 60,
    mixins: [Game.ItemMixins.Equippable],
    description: 'A small crossbow'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('shortBow', {
    name: 'Shortbow',
    class: 'simple ranged',
    character: '[',
    foreground: 'white',
    diceRoll: 6,
    bodyPart: 'hand',
    weight: 2,
    damageType: 'piercing',
    properties: ['ammunition', 'twoHanded'],
    normalRange: 80,
    maxRange: 320,
    mixins: [Game.ItemMixins.Equippable],
    description: 'A small bow'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('sling', {
    name: 'Sling',
    class: 'simple ranged',
    character: '[',
    foreground: 'white',
    diceRoll: 4,
    bodyPart: 'hand',
    weight: 0,
    damageType: 'bludgeoning',
    properties: ['ammunition'],
    normalRange: 30,
    maxRange: 120,
    mixins: [Game.ItemMixins.Equippable],
    description: 'A strap of leather used to throw rocks'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('battleAxe', {
    name: 'Battleaxe',
    class: 'martial melee',
    character: '[',
    foreground: 'white',
    diceRoll: 8,
    bodyPart: 'hand',
    weight: 4,
    damageType: 'slashing',
    versatileRoll: 10,
    mixins: [Game.ItemMixins.Equippable],
    description: 'A battle axe'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('flail', {
    name: 'Flail',
    class: 'martial melee',
    character: '[',
    foreground: 'white',
    diceRoll: 8,
    bodyPart: 'hand',
    weight: 2,
    damageType: 'bludgeoning',
    mixins: [Game.ItemMixins.Equippable],
    description: 'A flail'
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('glaive', {
    name: 'Glaive',
    class: 'martial melee',
    character: '[',
    foreground: 'white',
    diceRoll: 10,
    bodyPart: 'hand',
    weight: 6,
    damageType: 'slashing',
    properties: ['reach', 'heavy', 'twoHanded'],
    mixins: [Game.ItemMixins.Equippable],
    description: 'A glaive'
}, {
    disableRandomCreation: true
});