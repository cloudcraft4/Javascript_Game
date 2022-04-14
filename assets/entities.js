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

    meleeWeapon: 'scimitar',
    rangedWeapon: 'shortbow',
    sightRadius: 3,

    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});
/*
Skills Stealth +6
Senses darkvision 60 ft., passive Perception 9
Nimble Escape. The goblin can take the Disengage or Hide
action as a bonus action on each of its turns.
*/

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

    meleeWeapon: 'dagger',
    rangedWeapon: 'Sling',
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});
/*
Senses darkvision 60 ft., passive Perception 8
Sunlight Sensitivity. While in sunlight, the kobold has
disadvantage on attack rolls, as well as on Wisdom
(Perception) checks that rely on sight.
Pack Tactics. The kobold has advantage on an attack roll
against a creature if at least one of the kobold’s allies is within
5 feet of the creature and the ally isn’t incapacitated.
*/


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

    meleeWeapon: 'longSword',
    rangedWeapon: 'longBow',
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});

/*
Senses darkvision 60 ft., passive Perception 10
Martial Advantage. Once per turn, the hobgoblin can deal
an extra 7 (2d6) damage to a creature it hits with a weapon
attack if that creature is within 5 feet of an ally of the
hobgoblin that isn’t incapacitated.
*/

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

    bonusWeapon: 'bite',
    meleeWeapon: 'spear',
    rangedWeapon: 'longBow',
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});
/*
Rampage. When the gnoll reduces a creature to 0 hit points
with a melee attack on its turn, the gnoll can take a bonus
action to move up to half its speed and make a bite attack.

Actions
Bite. Melee Weapon Attack: +4 to hit, reach 5 ft., one creature.
Hit: 4 (1d4 + 2) piercing damage.
*/

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

    bonusWeapon: 'bite',
    meleeWeapon: 'heavyClub',
    rangedWeapon: 'javelin',
    shield: 'spikedShield',
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});
/*
Hold Breath. The lizardfolk can hold its breath for 15 minutes.

Actions
Multiattack. The lizardfolk makes two melee attacks, each
one with a different weapon.
Bite. Melee Weapon Attack: +4 to hit, reach 5 ft., one target.
Hit: 5 (1d6 + 2) piercing damage.

Spiked Shield. Melee Weapon Attack: +4 to hit, reach 5 ft., one
target. Hit: 5 (1d6 + 2) piercing damage.
*/
Game.EntityRepository.define('giantSpider', {
    name: 'giant spider',
    character: 'S',
    foreground: 'blue',
    armorClass: 14,
    maxHp: 26,
    speed: 30,
    strength: 14,
    dexterity: 16,
    constitution: 12,
    intellegence: 2,
    wisdom: 11,
    charisma: 4,
    challengeRating: 1,

    bonusWeapon: 'bite',
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});
/*

climb 30 ft.
Skills Stealth +7
Senses blindsight 10 ft., darkvision 60 ft., passive
Perception 10
Languages —
Spider Climb. The spider can climb difficult surfaces,
including upside down on ceilings, without needing to make
an ability check.
Web Sense. While in contact with a web, the spider knows
the exact location of any other creature in contact with
the same web.
Web Walker. The spider ignores movement restrictions
caused by webbing.

Actions
Bite. Melee Weapon Attack: +5 to hit, reach 5 ft., one creature.
Hit: 7 (1d8 + 3) piercing damage, and the target must make
a DC 11 Constitution saving throw, taking 9 (2d8) poison
damage on a failed save, or half as much damage on a
successful one. If the poison damage reduces the target to 0
hit points, the target is stable but poisoned for 1 hour, even
after regaining hit points, and is paralyzed while poisoned
in this way.

Web (Recharge 5–6). Ranged Weapon Attack: +5 to hit,
range 30/60 ft., one creature. Hit: The target is restrained
by webbing. As an action, the restrained target can make a
DC 12 Strength check, bursting the webbing on a success.
The webbing can also be attacked and destroyed (AC 10; hp
5; vulnerability to fire damage; immunity to bludgeoning,
poison, and psychic damage).
*/
Game.EntityRepository.define('giantRat', {
    name: 'giant rat',
    character: 'r',
    foreground: 'blue',
    armorClass: 12,
    maxHp: 7,
    speed: 30,
    strength: 7,
    dexterity: 15,
    constitution: 11,
    intellegence: 2,
    wisdom: 10,
    charisma: 4,
    challengeRating: .125,

    bonusWeapon: 'bite',
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});
/*
Senses darkvision 60 ft., passive Perception 10

Keen Smell. The rat has advantage on Wisdom (Perception)
checks that rely on smell.
Pack Tactics. The rat has advantage on an attack roll against a
creature if at least one of the rat’s allies is within 5 feet of the
creature and the ally isn’t incapacitated.

Actions
Bite. Melee Weapon Attack: +4 to hit, reach 5 ft., one target.
Hit: 4 (1d4 + 2) piercing damage.
*/

Game.EntityRepository.define('giantLizard', {
    name: 'giant lizard',
    character: 'r',
    foreground: 'blue',
    armorClass: 12,
    maxHp: 19,
    speed: 30,
    strength: 15,
    dexterity: 12,
    constitution: 13,
    intellegence: 2,
    wisdom: 10,
    charisma: 5,
    challengeRating: .25,

    bonusWeapon: 'bite',
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});
/*
climb 30 ft.
Senses darkvision 30 ft., passive Perception 10

Actions
Bite. Melee Weapon Attack: +4 to hit, reach 5 ft., one target.
Hit: 6 (1d8 + 2) piercing damage.

*/

Game.EntityRepository.define('Minotaur', {
    name: 'minotaur',
    character: 'm',
    foreground: 'blue',
    armorClass: 14,
    maxHp: 76,
    speed: 40,
    strength: 18,
    dexterity: 11,
    constitution: 16,
    intellegence: 6,
    wisdom: 16,
    charisma: 9,
    challengeRating: 3,

    bonusWeapon: 'horns',
    meleeWeapon: 'greatAxe',
    sightRadius: 3,
    tasks: ['hunt'],
    mixins: [Game.EntityMixins.Sight, Game.EntityMixins.TaskActor,
             Game.EntityMixins.Destructible, Game.EntityMixins.Attacker,
             Game.EntityMixins.ExperienceGainer, Game.EntityMixins.RandomStatGainer]
});
/*
Minotaur
Skills Perception +7
Senses darkvision 60 ft., passive Perception 17

Charge. If the minotaur moves at least 10 feet straight toward
a target and then hits it with a gore attack on the same turn,
the target takes an extra 9 (2d8) piercing damage. If the target
is a creature, it must succeed on a DC 14 Strength saving
throw or be pushed up to 10 feet away and knocked prone.
Labyrinthine Recall. The minotaur can perfectly recall any
path it has traveled.
Reckless. At the start of its turn, the minotaur can gain
advantage on all melee weapon attack rolls it makes during
that turn, but attack rolls against it have advantage until the
start of its next turn.

Actions
Greataxe. Melee Weapon Attack: +6 to hit, reach 5 ft., one
target. Hit: 17 (2d12 + 4) slashing damage.
Gore. Melee Weapon Attack: +6 to hit, reach 5 ft., one target.
Hit: 13 (2d8 + 4) piercing damage.
*/