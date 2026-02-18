ig.module(
	'game.entities.chick'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityChick = EntityCreature.extend({

    name: 'chick',
    isNasty: false,

	size: {x: 32, y: 32},
    animSheet: new ig.AnimationSheet( 'media/chick.png', 32, 32 ),	
	maxVel: {x: 100, y: 200},
	friction: {x: 600, y: 0},

    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,

	flip: false,
	accelGround: 400,
	accelAir: 200,
	jump: 200,
	health: 10,
    speed: 70,

    init: function(x, y, settings) {
    
        this.flip = settings.flip || false;
        this.speed = settings.speed || 70;

        x = (this.flip) ? 490 : -10;
        y = ig.system.height - 200;

        this.parent(x, y, settings);

		this.addAnim( 'walk', 0.07, [0,1] );
        this.anims.walk.flip.x = this.flip;

    },

    update: function() {


        if (this.vel.y === 0) {
			this.vel.y = -(Math.random() * 100);
        }

		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;

		this.parent();

    },



    receiveDamage: function() {
    
        ig.game.health.health -= 10;
        ig.game.sfx.hurt.play();
        this.kill();
    },



    deathAnim: function() {
        ig.game.spawnEntity( EntityAngel, this.pos.x, this.pos.y );
    }


});


});


ig.module(
	'game.entities.angel'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityAngel = EntityCreature.extend({

    name: 'angel',
    isNasty: false,

	size: {x: 32, y: 32},
    animSheet: new ig.AnimationSheet( 'media/angel.png', 30, 30 ),	
	maxVel: {x: 100, y: 200},
	friction: {x: 600, y: 0},

    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,

	flip: false,
	accelGround: 400,
	accelAir: -200,
	jump: 200,
    speed: 20,

    init: function(x, y, settings) {
    
        this.parent(x, y, settings);

		this.addAnim( 'idle', 0.07, [0,1] );

        this.vel.x = 0;
        this.accel.y = -1000;
        this.x = x;

    },

    update: function() {


        this.parent();
        // this.pos.x = this.x;
        // this.pos.y -= 2;
    }

});



});

