// I am not totally sure that I want to stick these in a repository
// There is less of a reason to do this than for items/entities but
// I guess it is fine for consistancy

Game.ScreenRepository = new Game.Repository('type', Game.ScreenType);

Game.ScreenRepository.define('class', {
    choices: {
        'Fighter': Game.classMixins.Fighter, 
        // I am only going to have fighter created in the short term
        'Wizard': Game.classMixins.Fighter, 
        'Monk': Game.classMixins.Fighter, 
        'Druid': Game.classMixins.Fighter
    },
    title: 'Choose what class of character you would like',    
    nextScreen: Game.switchScreen(Game.Screen.variableSelectScreen, Game.screenRaceSelect), 
    action: function(result) {
        Game.startingChoices.push(result);
    }
});

Game.ScreenRepository.define('race', {
    choices: {
        'Dwarf': Game.raceMixins.Dwarf, 
        'Elf': Game.raceMixins.Elf, 
        'Human': Game.raceMixins.human, 
        'Halfling': Game.raceMixins.Halfling
    },
    title: 'Choose what race of character you would like',    
    nextScreen: Game.switchScreen(Game.Screen.variableSelectScreen, Game.screenDwarfSubRace),
    action: function(result) {
        Game.startingChoices.push(result);
    }
});

Game.ScreenRepository.define('sub-dwarf', {
    choices: {
        'Hill Dwarf': Game.raceMixins.hillDwarf, 
        'Mountain Dwarf': Game.raceMixins.mountainDwarf, 
    },
    title: 'Choose your dwarven subrace',    
    nextScreen: Game.Screen.playScreen,
    action: function(result) {
        Game.startingChoices.push(result);
    }
});

Game.ScreenRepository.define('sub-elf', {
    choices: {
        'High Elf': Game.raceMixins.highElf, 
        'Wood Elf': Game.raceMixins.woodElf, 
    },
    title: 'Choose your elvish subrace',    
    nextScreen: Game.Screen.playScreen,
    action: function(result) {
        Game.startingChoices.push(result);
    }
});

Game.ScreenRepository.define('sub-hafling', {
    choices: {
        'Lightfoot Halfling': Game.raceMixins.lightfootHalfling, 
        'Stout Halfling': Game.raceMixins.stoutHalfling, 
    },
    title: 'Choose your halfling subrace',    
    nextScreen: Game.Screen.playScreen,
    action: function(result) {
        Game.startingChoices.push(result);
    }
});