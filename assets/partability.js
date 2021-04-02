Game.PartAbility = {};

Game.partAbility.demolitionArmOne = {
    //REQUIRES: Game.ItemMixins.rangedAttack, (eventually) Game.ItemMixins.areaEffect

    //TARGETING NOT WORKING YET.  NOT MUCH TO DO JUST I HAVE
    //NOT GOT AROUND TO IT.  NEED TO HANDLE WHAT TO DO AFTER
    //TARGET
    name: 'demolitionArmOne',
    init: function(template) {
        // Set up the cool downs for the part
        this._maxCoolDown = template['maxCoolDown'] || 5;
        this._currentCoolDown = template['currentCoolDown'] || 0;
        this._maxUses = template['maxUses'] || 1;
    },
    useAbility: function(entity) {
        
        //This is what needs to happen after choosing target
        let afterTargeting = function() {
            this.damageTarget(targetPosition);
            this.checkUses();
        };
        //
        //  WORKING ON THIS WHEN I AM NOT BORED OF IT
        //
        this.pickTarget(afterTargeting);
        
    },
}

Game.partAbility.demolitionArmTwo = {

    //REQUIRES: Game.ItemMixins.areaEffect
    name: 'demolitionArmTwo',
    init: function(template) {
        // Set up the cool downs for the part
        this._maxCoolDown = template['maxCoolDown'] || 1;
        this._currentCoolDown = template['currentCoolDown'] || 0;
    },
    useAbility: function(entity) {
        //EVENTUALLY --> effectArea(effectType, target, areaSize);
        let targetX = Game.Screen.playScreen._player.getX();
        let targetY = Game.Screen.playScreen._player.getY();
        effectArea(targetX, targetY);
    },
}

Game.partAbility.demolitionTorso = {

    name: 'demolitionTorso',
    init: function(template) {
        this._selfExplosionImmunity = true;
        // This is a percentage I guess.  NOT IMPLIMENTED
        this._explosionResistance = template['explosionResistance'] ||50;
    },
    //Not sure if I want a useAbility saying what this part does or not
    //If not then just grayed out if it has no useAbility
    //THIS PART NOT IMPLIMENTED EITHER
}


Game.partAbility.demolitionHead = {
    //REQUIRES: Game.ItemMixins.Healing

    name: 'demolitionHead',
    init: function(template) {
        this._explosionHealing = true;
        //This is here just in case I need to lower power level of
        //the ability by saying it can only be occasionally used
        this._maxCoolDown = template['maxCoolDown'] || 5;
        this._currentCoolDown = template['currentCoolDown'] || 0;
    },
    //I NEED TO FIGURE OUT HOW I WANT TO DO THIS.  MAYBE AFTER DEATH
    //CYCLE THROUGH EVERY PART AND LOOK FOR THE onDeath FUNCTION???
    deathAbility: function() {
        self.heal();
    },
    
}