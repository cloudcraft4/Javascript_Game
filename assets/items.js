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

// Default
Game.ItemRepository.define('default arm', {
    name: 'default arm',
    character: ')',
    foreground: 'gray',
    attackValue: 0,
    bodyPart: 'arm',
    maxCoolDown: 0,
    currentCoolDown: 0,
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
    maxCoolDown: 0,
    currentCoolDown: 0,
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
    maxCoolDown: 0,
    currentCoolDown: 0,
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
    maxCoolDown: 0,
    currentCoolDown: 0,
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
    maxCoolDown: 0,
    currentCoolDown: 0,
    mixins: [Game.ItemMixins.Equippable],
    description: 'This default head is used whenever you don\'t have a better option.'
}, {
    disableRandomCreation: true
});

//Demolitions
Game.ItemRepository.define('demolition head', {
    name: 'Demolition Head',
    class: 'demolitions',
    character: ')',
    foreground: 'yellow',
    bodyPart: 'head',
    healValue: 2,
    maxCoolDown: 5,
    currentCoolDown: 0,
    mixins: [Game.ItemMixins.Equippable, Game.PartAbility.demolitionHead,
        Game.ItemMixins.Healing],
    description: 'When enemies are destroyed by explosions you are able to heal.',
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('dynamite arm', {
    name: 'Dynamite Arm',
    class: 'demolitions',
    character: ')',
    foreground: 'gray',
    attackValue: 10,
    bodyPart: 'arm',
    onUse: true,
    damage: 20,
    areaSize: 2,
    maxUses: 1,
    mixins: [Game.ItemMixins.rangedAttack, Game.ItemMixins.Equippable, 
        Game.PartAbility.demolitionArmOne],
    description: 'Throw this arm to do massive damage'
    //AOE ranged attack
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('demolition arm2', {
    name: 'Demolition Arm2',
    class: 'demolitions',
    character: ')',
    foreground: 'gray',
    abilityDamage: 8,
    bodyPart: 'arm',
    maxCoolDown: 1,
    currentCoolDown: 0,
    onUse: true,
    areaSize: 1,
    mixins: [Game.ItemMixins.Equippable, Game.ItemMixins.areaEffect,
        Game.PartAbility.demolitionArmTwo],
    description: 'Causes explosions around self.  Will not cause self damage'
    // Causes explosions around self.  Will not cause self damage
}, {
    disableRandomCreation: true
});


Game.ItemRepository.define('demolition torso', {
    name: 'demolition torso',
    class: 'demolitions',
    character: ')',
    foreground: 'gray',
    explosionResistance: 50,
    defenseValue: 3,
    bodyPart: 'torso',
    mixins: [Game.ItemMixins.Equippable, Game.PartAbility.demolitionTorso],
    description: 'Gives Immunity to self explosions and resistance to explosions from enemies'
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
    maxCoolDown: 5,
    currentCoolDown: 0,
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
    maxCoolDown: 5,
    currentCoolDown: 0,
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
    maxCoolDown: 5,
    currentCoolDown: 0,
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
    maxCoolDown: 5,
    currentCoolDown: 0,
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
    maxCoolDown: 5,
    currentCoolDown: 0,
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
    maxCoolDown: 5,
    currentCoolDown: 0,
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
    maxCoolDown: 5,
    currentCoolDown: 0,
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
    maxCoolDown: 5,
    currentCoolDown: 0,
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
    maxCoolDown: 5,
    currentCoolDown: 0,
    onUse: true,
    mixins: [Game.ItemMixins.Equippable, Game.PartAbility.manufactoringArm]
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
    maxCoolDown: 5,
    currentCoolDown: 0,
    mixins: [Game.ItemMixins.Equippable]
    // Generic hitting plus something.  Create something...  Diff version of sentry bot?
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
    maxCoolDown: 5,
    currentCoolDown: 0,
    mixins: [Game.ItemMixins.Equippable]
    //  Create caltrops/spikes/ oil slick...   Slowdown for enemies or unstable (less defense).
    //!!! Or Legs are generic attack as something diff !!!
}, {
    disableRandomCreation: true
});

Game.ItemRepository.define('repair arm', {
    name: 'repair arm',
    class: 'repair',
    character: '[',
    foreground: 'white',
    attackValue: 10,
    bodyPart: 'arm',
    healValue: 20,
    onUse: 'heal',
    maxUses: 1,
    maxCoolDown: 0,
    currentCoolDown: 0,
    mixins: [Game.ItemMixins.Healing, Game.ItemMixins.Equippable],
    description: 'Contains enough repair nanites for a single use.'
}, {
    disableRandomCreation: true
});
