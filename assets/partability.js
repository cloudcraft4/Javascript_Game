Game.PartAbility = {};



Game.PartAbility.demolitionArmOne = {
    //REQUIRES: Game.ItemMixins.rangedAttack, (eventually) Game.ItemMixins.areaEffect

    name: 'demolitionArmOne',
    init: function(template) {
        //Cooldowns and maxUses set up under equipable
        //this._maxUses = template['maxUses'] || 1;
    },
    useAbility: function(entity) {
        //This is what needs to happen after choosing target
        let afterTargeting = function(targetX, targetY, item) {
            item.damageTarget(targetX, targetY);
            item._remainingUses--;
            item.checkUses();
        };
        this.pickTarget(afterTargeting);        
    },
}

Game.PartAbility.demolitionArmTwo = {

    //REQUIRES: Game.ItemMixins.areaEffect
    name: 'demolitionArmTwo',
    init: function(template) {
        //So far nothing to do here
    },
    useAbility: function(entity) {
        console.log('Called use ability on demo arm2');
        if (this._currentCoolDown <= 0) {
            //EVENTUALLY --> effectArea(effectType, target, areaSize);
            let targetX = Game.Screen.playScreen._player.getX();
            let targetY = Game.Screen.playScreen._player.getY();
            this.effectArea(targetX, targetY);
            //Reset the Cool Down timer
            this._currentCoolDown = this._maxCoolDown;
        }            
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
    },
    deathAbility: function(cause) {
        if (cause === 'explosion') {
            this.heal();
        }
    },
    
}

Game.PartAbility.manufactoringArm = {
    //REQUIRES: NOTHING YET...

    name: 'manufactoringArm',
    init: function(template) {
        this._hasBot = false;
    },
    useAbility: function(entity) {
        if (this._hasBot === false) {
            //Need to modify how drones work.  Right now it will attack player
            //Also when it dies it does not switch this._hasBot to false
            this.createBot(entity, 'drone');
            this._hasBot = true;
        }
    },
    createBot: function(entity, bot) {
        // Generate a random position nearby.
        var xOffset = Math.floor(Math.random() * 3) - 1;
        var yOffset = Math.floor(Math.random() * 3) - 1;

        // Check if we can spawn an entity at that position.
        if (!entity.getMap().isEmptyFloor(entity.getX() + xOffset, entity.getY() + yOffset,
            entity.getZ())) {
            // If we cant, do nothing
            return;
        }
        // Create the entity
        let minion = Game.EntityRepository.create(bot);
        minion.setX(entity.getX() + xOffset);
        minion.setY(entity.getY() + yOffset)
        minion.setZ(entity.getZ());
        entity.getMap().addEntity(minion);
        
    },
}