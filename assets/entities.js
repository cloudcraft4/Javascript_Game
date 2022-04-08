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
            leftArm: 'default arm'},
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
    challengeRating: 0.25,

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
    challengeRating: 0.125,

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
    challengeRating: 0.5,

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
    challengeRating: 0.5,

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
    challengeRating: 0.5,

    attackValue: 5,
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});