//Npte probably make this a function of something
//perhaps entities????

//or mixin of stats or something

getModifier: function(abilityScore) {
    modifier = Math.floor(Math.sqrt(abilityScore) - 5);
    return modifier;
}

// This is code to do rolling of the dice.  Likely I want max to be exclusive.
// There is an easier way to do this with Math.round() but apparently that makes things 
// less random 

//From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

  //This is the inclusive example

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  }

// I THINK this works but not totally sure
// Should I add something for more dice?  Like for 4 D20
// This would be easy to do but not sure if it is helpful

function rollDice(diceNum) {
    max = Math.floor(diceNum) ;
    return Math.floor(Math.random() * (max) + 1);
  }

