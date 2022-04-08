//NOT SURE WHERE TO PUT THESE (for now just under game)
//This is not working properly as well

// The nextScreen part is totally not working as well....
// I could make it part of the raceMixins I guess.......

Game.screenRaceSelect = {
    choices: {
        'Dwarf': Game.raceMixins.Dwarf, 
        'Elf': Game.raceMixins.Elf, 
        'Human': Game.raceMixins.human, 
        'Halfling': Game.raceMixins.Halfling
    },
    title: 'Choose what race of character you would like',    
    nextScreen: Game.Screen.variableSelectScreen(Game.screenDwarfSubRace),
}

Game.screenDwarfSubRace = {
    choices: {
        'Hill Dwarf': Game.raceMixins.hillDwarf, 
        'Mountain Dwarf': Game.raceMixins.mountainDwarf, 
    },
    title: 'Choose your dwarven subrace',    
    nextScreen: Game.Screen.playScreen,
}

Game.screenElfSubRace = {
    choices: {
        'High Elf': Game.raceMixins.highElf, 
        'Wood Elf': Game.raceMixins.woodElf, 
    },
    title: 'Choose your elvish subrace',    
    nextScreen: Game.Screen.playScreen,
}

Game.screenHalflingSubRace = {
    choices: {
        'Lightfoot Halfling': Game.raceMixins.lightfootHalfling, 
        'Stout Halfling': Game.raceMixins.stoutHalfling, 
    },
    title: 'Choose your halfling subrace',    
    nextScreen: Game.Screen.playScreen,
}