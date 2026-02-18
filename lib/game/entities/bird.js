ig.module(
	'game.entities.bird'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityBird = EntityCreature.extend({

    name: 'bird',
	size: {x: 42, y: 46},
    // animSheet: new ig.AnimationSheet( 'media/baddie_bird.png', 42, 46 ),	
    animSheet: new ig.AnimationSheet( 'media/bird.png', 42, 46 ),	
	maxVel: {x: 100, y: 500},
	friction: {x: 600, y: 200},
    gravity: 0,

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

        x = (this.flip) ? ig.system.width + this.size.x : 0 - this.size.x;
        y = 50;

        this.parent(x, y, settings);

		this.addAnim( 'fly', 0.1, [0,1] );
    },

    update: function() {

        if(this.offscreen()) {
            this.kill(true);
            ig.game.escaped += 1;
            ig.game.health.health -= 30;
		}

		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;

		this.currentAnim.flip.x = this.flip;

		this.parent();
    

    },


    receiveDamage: function() {
        this.health -= 5;
        this.vel.y = -(Math.random() * 200);
        if (this.health < 1) {
            this.kill();
        }
    },

    kill: function() {
        var i = 0;
        for (i = 0; i < 4; i += 1) {
               ig.game.spawnEntity( EntityDebrisParticle, this.pos.x, this.pos.y );
        }
        this.parent();

    }


});


});
