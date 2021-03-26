Game.ItemRepository = new Game.Repository('items', Game.Item);

/*
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

// Default
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

Game.ItemRepository.define('default legs', {
    name: 'default legs',
    character: ')',
    foreground: 'gray',
    attackValue: 0,
    bodyPart: 'legs',
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

Game.ItemRepository.define('default head', {
    name: 'default head',
    character: ')',
    foreground: 'gray',
    defenseValue: 0,
    bodyPart: 'head',
    mixins: [Game.ItemMixins.Equippable],
    description: 'This default head is used whenever you don\'t have a better option.'
}, {
    disableRandomCreation: true
});

//Demolitions
Game.ItemRepository.define('demolition head', {
    name: 'demolition head',
    class: 'demolitions',
    character: ')',
    foreground: 'yellow',
    defenseValue: 3,
    bodyPart: 'head',
    mixins: [Game.ItemMixins.Equippable]
    //Immunity to explosions (if not torso)?  Healing when things die from explosions?
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('dynamite arm', {
    name: 'Dynamite Arm',
    class: 'demolitions',
    character: ')',
    foreground: 'gray',
    attackValue: 5,
    bodyPart: 'arm',
    onUse: 'rangedAttack',
    mixins: [Game.ItemMixins.rangedAttack, Game.ItemMixins.Equippable],
    description: 'This is made of fireballs. Weird...
    //AOE ranged attack
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('demolition arm2'), {
    name: 'ddemolition arm2',
    class: 'demolitions',
    character: ')',
    foreground: 'gray',
    attackValue: 5,
    bodyPart: 'arm',
    mixins: [Game.ItemMixins.Equippable],
    description: 'An unweildy but gigantic claw'
    // ??? Generic attack??
}, {
    disableRandomCreation: true
});


Game.ItemRepository.define('demolition torso'), {
    name: 'demolition torso',
    class: 'demolitions',
    character: ')',
    foreground: 'gray',
    attackValue: 5,
    bodyPart: 'torso',
    mixins: [Game.ItemMixins.Equippable],
    description: 'An unweildy but gigantic claw'
    //Immunity to explosions???  Health somehow
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('demolition legs', {
    name: 'demolition legs',
    class: 'demolitions',
    character: '}',
    foreground: 'white',
    attackValue: 10,
    bodyPart: 'legs',
    mixins: [Game.ItemMixins.Equippable],
    description: 'Deals medium damage.  One time healing use.'
    // ??  Exposion causing propulsion or something??
}, {
    disableRandomCreation: true
});

//Security
Game.ItemRepository.define('sec head', {
    name: 'sec head',
    class: 'security',
    character: '[',
    foreground: 'green',
    defenseValue: 2,
    bodyPart: 'head',
    mixins: [Game.ItemMixins.Equippable]
    //Increase status effect chances???  Not great... 
    // Something about yelling Alarm?
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('sec torso', {
    name: 'sec torso',
    class: 'security',
    character: '[',
    foreground: 'green',
    defenseValue: 2,
    bodyPart: 'torso',
    mixins: [Game.ItemMixins.Equippable]
    //Something with stun?  Stun resist plus defense?
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('sec arm1', {
    name: 'sec arm1',    
    class: 'security',
    character: '[',
    foreground: 'white',
    attackValue: 4,
    bodyPart: 'arm',
    mixins: [Game.ItemMixins.Equippable]
    //Electricity hit?  (spread to other enemies)
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('sec arm2', {
    name: 'sec arm2',
    class: 'security',
    character: '[',
    foreground: 'white',
    attackValue: 4,
    bodyPart: 'arm',
    mixins: [Game.ItemMixins.Equippable]
    //Hit with a chance to stun
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('sec legs', {
    name: 'sec legs',
    class: 'security',
    character: '}',
    foreground: 'aliceblue',
    defenseValue: 6,
    bodyPart: 'legs',
    mixins: [Game.ItemMixins.Equippable]
    // ??
}, {
    disableRandomCreation: true
});

//Manufacturing
Game.ItemRepository.define('manu head', {
    name: 'manu head',
    class: 'manufacturing',
    character: '[',
    foreground: 'green',
    defenseValue: 2,
    bodyPart: 'head',
    mixins: [Game.ItemMixins.Equippable]
    // Heal on installing parts?
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('manufacturing torso', {
    name: 'manufacturing torso',
    class: 'manufacturing',
    character: '[',
    foreground: 'green',
    defenseValue: 2,
    bodyPart: 'torso',
    mixins: [Game.ItemMixins.Equippable]
    // ??  Create weak parts??  Recycle old parts for chance of new one???
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('manufacturing arm1', {
    name: 'manufacturing arm1',    
    class: 'manufacturing',
    character: '[',
    foreground: 'white',
    attackValue: 4,
    bodyPart: 'arm',
    mixins: [Game.ItemMixins.Equippable]
    // Create sentry bot?
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('manufacturing arm2', {
    name: 'manufacturing arm2',
    class: 'manufacturing',
    character: '[',
    foreground: 'white',
    attackValue: 4,
    bodyPart: 'arm',
    mixins: [Game.ItemMixins.Equippable]
    // Generic hitting plus something
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('manufacturing legs', {
    name: 'manufacturing legs',
    class: 'manufacturing',
    character: '}',
    foreground: 'aliceblue',
    defenseValue: 6,
    bodyPart: 'legs',
    mixins: [Game.ItemMixins.Equippable]
    //  Create caltrops/spikes/ oil slick...   Slowdown for enemies or unstable (less defense)
}, {
    disableRandomCreation: true
});

/* HERE IS HOW HEALING ITEMS WORK
Game.ItemRepository.define('healing', {
    name: 'demo legs',
    class: 'demolitions',
    character: '[',
    foreground: 'white',
    attackValue: 10,
    bodyPart: 'legs,
    healValue: 20,
    onUse: 'heal',
    maxUses: 1,
    mixins: [Game.ItemMixins.Healing, Game.ItemMixins.Equippable],
    description: 'Deals medium damage.  One time healing use.'
}, {
    disableRandomCreation: true
});
*/