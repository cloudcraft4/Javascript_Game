// Player template
Game.PlayerTemplate = {
    name: 'human (you)',
    character: '@',
    foreground: 'white',
    maxHp: 40,
    attackValue: 10,
    sightRadius: 6,
    inventorySlots: 22,
    arms: {rightArm: 'large claw',
           leftArm: 'large claw'       
    },
    legs: {rightLeg: 'default leg',
            leftLeg: 'default leg'       
    },
    torso: {mainTorso: 'tunic torso',     
    },
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

Game.EntityRepository.define('feral dog', {
    name: 'feral dog',
    character: 'd',
    foreground: 'white',
    maxHp: 5,
    attackValue: 4,
    speed: 2000,
    mixins: [Game.EntityMixins.TaskActor, 
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

Game.EntityRepository.define('mutant', {
    name: 'mutant',
    character: 'm',
    foreground: 'yellow',
    maxHp: 3,
    attackValue: 2,
    possibleParts: ['large claw', 'chainmail torso'],
    mixins: [Game.EntityMixins.TaskActor,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer,
             Game.EntityMixins.Equipper]
});

Game.EntityRepository.define('crabman', {
    name: 'crabman',
    character: 'c',
    foreground: 'white',
    maxHp: 6,
    attackValue: 4,
    sightRadius: 5,
    possibleParts: ['default leg', 'staff arm', 'large claw'],
    tasks: ['hunt', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer,
             Game.EntityMixins.Equipper]
});

Game.EntityRepository.define('giant zombie', {
    name: 'giant zombie', 
    character: 'Z',
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

Game.EntityRepository.define('slime', {
    name: 'slime',
    character: 's',
    foreground: 'lightGreen',
    maxHp: 10,
    attackValue: 5,
    sightRadius: 3,
    tasks: ['hunt', 'wander'],
    mixins: [Game.EntityMixins.TaskActor, Game.EntityMixins.Sight,
             Game.EntityMixins.Attacker, Game.EntityMixins.Destructible,
             Game.EntityMixins.CorpseDropper,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});