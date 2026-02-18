ig.module(
	'game.entities.mole'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityMole = EntityCreature.extend({

    name: false,
    realName: 'mole',
	size: {x: 33, y: 30},
    animSheet: new ig.AnimationSheet( 'media/mole.png', 33, 30 ),	
	maxVel: {x: 0, y: 0},
    gravity: 0,

    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,

    isNasty: false,
	flip: false,
	accelGround: 0,
	accelAir: 0,
	jump: 200,
	health: 10,
    speed: 70,
    timer: new ig.Timer(),
    state: 'appear',
    fireFrame: 4,
    shotStrength: 0.5,

    init: function(x, y, settings) {
    
        this.flip = settings.flip || false;
        this.speed = settings.speed || 70;

        x = ~~(Math.random() * (400)) + this.size.x;
        y = 175 + ~~(Math.random() * 10);

        this.size.x = 24;
        this.size.y = 25;
        this.offset.x = 4;
        this.offset.y = 6;

        this.parent(x, y, settings);

		this.addAnim( 'appear', 0.1, [0,1,2], true );
		this.addAnim( 'disappear', 0.1, [2,1,0,7], true );
		this.addAnim( 'look', 0.5, [3,4,3,4,3,4], true );

        this.vel.y = 1;

        this.changeState('appear', ~~(Math.random() * 1) + 1);

        this.shoot = ~~( Math.random() * 50 ) + 50;
        this.hasShot = false;

    },

    update: function() {


        if (this.state === 'appear' && this.timer.delta() > 0) {
            this.changeState('look', 1);
        }
        else if (this.state === 'look' && this.timer.delta() > 0) {
            this.changeState('disappear', 0.5);
        }
        else if (this.state === 'disappear' && this.timer.delta() > 0) {
            this.kill(false);
        }


		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;

		this.parent();

    },



    changeState: function(state, duration) {
   
        duration = duration || Math.random() * 2;

        this.state = state;
        this.name = (state === 'look') ? 'mole' : false;
        this.currentAnim = this.anims[state].rewind();
        this.timer.set(duration);
    
    },


    receiveDamage: function() {

        if (this.state === 'look') {
            ig.game.health.health -= 20;
            ig.game.sfx.hurt.play();
            this.kill();
        }
    },

    deathAnim: function() {
        ig.game.spawnEntity( EntityAngelmole, this.pos.x, this.pos.y );
    }

});


});


ig.module(
	'game.entities.angelmole'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityAngelmole = EntityCreature.extend({

    name: 'angelmole',
    isNasty: false,

	size: {x: 33, y: 37},
    animSheet: new ig.AnimationSheet( 'media/angelmole.png', 33, 37 ),	
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

		this.addAnim( 'idle', 0.07, [0] );

        this.vel.x = 0;
        this.accel.y = -1000;
        this.x = x;

    },

    update: function() {
        if (this.offscreen()) {
            this.kill(false);
        }

        this.parent();
    }

});
});

