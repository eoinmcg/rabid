ig.module(
	'game.entities.burrower'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityBurrower = EntityCreature.extend({

    name: false,
    realName: 'burrower',
	size: {x: 36, y: 40},
    animSheet: new ig.AnimationSheet( 'media/burrower.png', 36, 40 ),	
	maxVel: {x: 0, y: 0},
    gravity: 0,

    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,

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
    points: 20,

    init: function(x, y, settings) {
    
        this.flip = settings.flip || false;
        this.speed = settings.speed || 70;

        x = ~~(Math.random() * (400)) + this.size.x;
        y = 160 + ~~(Math.random() * 10);

        this.size.x = 20;
        this.size.y = 37;
        this.offset.x = 6;
        this.offset.y = 6;

        this.parent(x, y, settings);

		this.addAnim( 'appear', 0.1, [0,1,2], true );
		this.addAnim( 'disappear', 0.1, [2,1,0,7], true );
		this.addAnim( 'shoot', 0.1, [3,3,3,3,3,3,4,3,3,4,3], true );

        this.vel.y = 1;

        this.changeState('appear', ~~(Math.random() * 1) + 1);

        this.shoot = ~~( Math.random() * 50 ) + 50;
        this.hasShot = false;

    },

    update: function() {


        if (this.state === 'appear' && this.timer.delta() > 0) {
            this.changeState('shoot', 1);
        }
        else if (this.state === 'shoot' && this.timer.delta() > 0) {
            this.changeState('disappear', 0.5);
        }
        else if (this.state === 'disappear' && this.timer.delta() > 0) {
            this.kill(false);
            ig.game.escaped += 1;
        }


		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;


		this.parent();

    },


    receiveDamage: function(other) {

        if (this.state === 'shoot') {
            this.kill(true);
        }

    },


    changeState: function(state, duration) {
   
        duration = duration || Math.random() * 2;

        this.state = state;
        this.name = (state === 'shoot') ? 'burrower' : false;
        this.currentAnim = this.anims[state].rewind();
        this.timer.set(duration);
    
    }

    // kill: function(explode) {

    //     var i = 0;
    //     if (explode) {
    //         ig.game.score.points += 15;
    //         for (i = 0; i < 4; i += 1) {
    //             ig.game.spawnEntity( EntityDebrisParticle, this.pos.x, this.pos.y );
    //         }
    //     
    //     }
    //     this.parent();

    // },



});


});


