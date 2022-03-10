// Player template
Game.PlayerTemplate = {
    name: 'human (you)',
    character: '@',
    foreground: 'white',
    maxHp: 40,
    attackValue: 10,
    sightRadius: 6,
    inventorySlots: 22,
    arms: {rightArm: 'default arm',
            leftArm: 'default arm'      
    },
    legs: {mainLegs: 'default legs'},
    head: {mainHead: 'defaul head'},
    torso: {mainTorso: 'defaul torso',},
    mixins: [Game.EntityMixins.PlayerActor,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.InventoryHolder, Game.EntityMixins.FoodConsumer,
             Game.EntityMixins.Sight, Game.EntityMixins.MessageRecipient,
             Game.EntityMixins.Equipper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.PlayerStatGainer]
};

// Create our central entity repository
Game.EntityRepository = new Game.Repository('entities', Game.Entity);

Game.EntityRepository.define('fungus', {
    name: 'fungus',
    character: 'F',
    foreground: 'green',
    maxHp: 10,
    speed: 250,
    mixins: [Game.EntityMixins.FungusActor, Game.EntityMixins.Destructible,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

/*
Game.EntityRepository.define('cleaning robot', {
    name: 'cleaning robot',
    character: 'c',
    foreground: 'white',
    maxHp: 5,
    attackValue: 4,
    speed: 2000,
    mixins: [Game.EntityMixins.TaskActor, 
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('malfunctioning robot', {
    name: 'malfunctioning robot',
    character: 'm',
    foreground: 'yellow',
    maxHp: 3,
    attackValue: 2,
    possibleParts: ['sec arm1', 'sec torso'],
    mixins: [Game.EntityMixins.TaskActor,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer,
             Game.EntityMixins.Equipper]
});

Game.EntityRepository.define('security robot', {
    name: 'security robot',
    character: 's',
    foreground: 'white',
    maxHp: 6,
    attackValue: 4,
    sightRadius: 5,
    possibleParts: ['sec legs', 'sec arm1', 'sec torso'],
    tasks: ['hunt', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer,
             Game.EntityMixins.Equipper]
});

Game.EntityRepository.define('foreman robot', {
    name: 'foreman robot', 
    character: 'F',
    foreground: 'teal',
    maxHp: 30,
    attackValue: 8,
    defenseValue: 5,
    level: 5,
    sightRadius: 6,
    mixins: [Game.EntityMixins.GiantZombieActor, Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer]
}, {
    disableRandomCreation: true
});

Game.EntityRepository.define('drone', {
    name: 'drone',
    character: 'd',
    foreground: 'blue',
    maxHp: 10,
    attackValue: 5,
    sightRadius: 3,
    mapCreation: false,
    isAlly: true,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

*/

Game.EntityRepository.define('goblin', {
    name: 'goblin',
    character: 'g',
    foreground: 'green',
    armorClass: 15,
    maxHp: 7,
    speed: 30,
    strength: 8,
    dexterity: 14,
    constitution: 10,
    intellegence: 10,
    wisdom: 8,
    charisma: 8,
    xpGiven: 50,

    attackValue: 5,
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('kobold', {
    name: 'kobold',
    character: 'k',
    foreground: 'green',
    armorClass: 12,
    maxHp: 5,
    speed: 30,
    strength: 7,
    dexterity: 15,
    constitution: 9,
    intellegence: 8,
    wisdom: 7,
    charisma: 8,
    xpGiven: 25,

    attackValue: 5,
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('hobgoblin', {
    name: 'hobgoblin',
    character: 'g',
    foreground: 'brown',
    armorClass: 18,
    maxHp: 11,
    speed: 30,
    strength: 13,
    dexterity: 12,
    constitution: 12,
    intellegence: 10,
    wisdom: 10,
    charisma: 9,
    xpGiven: 100,

    attackValue: 5,
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('gnoll', {
    name: 'gnoll',
    character: 'G',
    foreground: 'blue',
    armorClass: 15,
    maxHp: 22,
    speed: 30,
    strength: 14,
    dexterity: 12,
    constitution: 11,
    intellegence: 6,
    wisdom: 10,
    charisma: 7,
    xpGiven: 100,

    attackValue: 5,
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('lizardfolk', {
    name: 'lizardfolk',
    character: 'L',
    foreground: 'blue',
    armorClass: 15,
    maxHp: 22,
    speed: 30,
    strength: 15,
    dexterity: 10,
    constitution: 13,
    intellegence: 7,
    wisdom: 12,
    charisma: 7,
    xpGiven: 100,

    attackValue: 5,
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});