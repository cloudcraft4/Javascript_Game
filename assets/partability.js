Game.PartAbility = {};



Game.PartAbility.demolitionArmOne = {
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

Game.PartAbility.demolitionArmTwo = {

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

Game.PartAbility.demolitionTorso = {

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


Game.PartAbility.demolitionHead = {
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

Game.PartAbility.manufactoringArm = {
    //REQUIRES: NOTHING YET...

    name: 'manufactoringArm',
    init: function(template) {
        this._maxCoolDown = template['maxCoolDown'] || 5;
        this._currentCoolDown = template['currentCoolDown'] || 0;
        this._hasBot = false;
    },
    useAbility: function() {
        if (this._hasBot === false) {
            //Need to modify how drones work.  Right now it will attack player
            //Also when it dies it does not switch this._hasBot to false
            createBot('drone');
            this._hasBot = true;
        }
    },
    createBot: function(bot) {
        // Generate a random position nearby.
        var xOffset = Math.floor(Math.random() * 3) - 1;
        var yOffset = Math.floor(Math.random() * 3) - 1;

        // Check if we can spawn an entity at that position.
        if (!this.getMap().isEmptyFloor(this.getX() + xOffset, this.getY() + yOffset,
            this.getZ())) {
            // If we cant, do nothing
            return;
        }
        // Create the entity
        let minion = Game.EntityRepository.create(bot);
        minion.setX(this.getX() + xOffset);
        minion.setY(this.getY() + yOffset)
        minion.setZ(this.getZ());
        this.getMap().addEntity(minion);
        
    },
}