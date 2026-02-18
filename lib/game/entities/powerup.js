ig.module(
	'game.entities.powerup'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityPowerup = EntityCreature.extend({

    name: 'powerup',
	size: {x: 49, y: 26},
    animSheet: new ig.AnimationSheet( 'media/powerups.png', 49, 26 ),	
	maxVel: {x: 190, y: 500},
	friction: {x: 600, y: 290},
    gravity: 0,

    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,

	flip: false,
	accelGround: 400,
	accelAir: 200,
	jump: 200,
	health: 10,
    speed: 90,
    types: ['bullet', 'bomb', 'heart'],
    isNasty: false,

    init: function(x, y, settings) {
    
        var i, rnd, anim, offset = 0;

        this.flip = settings.flip || false;

        x = (this.flip) ? ig.system.width + this.size.x : 0 - this.size.x;
        y = 30;

        this.parent(x, y, settings);

        for (i = 0; i < this.types.length; i += 1) {
            this.addAnim( this.types[i], 0.09, [0+offset,1+offset] );
            offset += 2;
        }

        rnd = ~~( Math.random() * (this.types.length) );
        if (ig.game.level === ig.game.levelData.length) {
            rnd = 1;
        }

        anim = this.types[rnd];
        this.name = anim;

        this.currentAnim = this.anims[anim];
    },

    update: function() {

        if(this.offscreen()) {
            this.kill(true);
		}

		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;

		this.currentAnim.flip.x = this.flip;

		this.parent();
    

    },


    receiveDamage: function() {
    
        switch (this.name) {
       
            case 'bullet':
                ig.game.bullets = 18;
                ig.game.sfx.reload.play();
            break;

            case 'bomb':
                ig.game.sfx.boom.play();
                ig.game.killAll();
            break;

            case 'heart':
                ig.game.health.health += 10;
            break;
            
            default:
            break;
        
        }


        this.kill();
    
    },


    kill: function() {

        switch (this.name) {
            case 'bullet':
                ig.game.spawnEntity(EntityPowerupDone,
                            this.pos.x,
                            this.pos.y,
                            {cat: 'bullet'});
            break;

            case 'heart':
                ig.game.spawnEntity(EntityPowerupDone,
                            this.pos.x,
                            this.pos.y,
                            {cat: 'heart'});
            break;

            case 'bomb':
                for (i = 0; i < 3; i += 1) {
                    ig.game.spawnEntity( EntityDebrisParticle, 
                    this.pos.x, this.pos.y );
                }
            break;
        }
        

        this.parent(false);
    }

});


EntityPowerupDone = EntityCreature.extend({


    name: 'powerupdone',
    size: {x: 26, h: 26},
    animSheet: new ig.AnimationSheet('media/powerupdone.png', 26, 26),

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.LITE,
	maxVel: {x: 400, y: 400},
	friction: {x:0, y: 0},

    isNasty: false,

    init: function(x, y, settings) {

        var dir = ( ~~(Math.random() * 2) === 0 ) ? -1 : 1;

        this.parent(x, y, settings); 
        this.cat = settings.cat;
		this.addAnim( 'heart', 0.1, [0] );
		this.addAnim( 'bullet', 0.1, [1] );
        this.currentAnim = this.anims[this.cat];


        this.vel.x = -200 * dir;
        this.vel.y = -2000;
    },

    update: function() {
    
        if (this.pos.y < -50) {
            this.kill();
        }
        this.parent();
    },

    deathAnim: function() {}



});


});

