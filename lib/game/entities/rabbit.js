ig.module(
	'game.entities.rabbit'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityRabbit = EntityCreature.extend({

    name: 'rabbit',
	size: {x: 35, y: 43},
    animSheet: new ig.AnimationSheet( 'media/rabbit.png', 35, 43 ),	
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

        x = (this.flip) ? ig.system.width + this.size.x : 0 - this.size.x;
        y = ig.system.height - 100;

        this.parent(x, y, settings);

		this.addAnim( 'fall', 0.1, [0] );
		this.addAnim( 'stand', 0.1, [1] );
		this.addAnim( 'jump', 0.1, [2] );
    },

    update: function() {

		if ( this.offscreen() ) {
            this.kill(true);
            ig.game.escaped += 1;
            ig.game.health.health -= 30;
		}
		
		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;

        if (this.vel.y === 0) {
			this.vel.y = -(Math.random() * 200);
        }

		if ( this.vel.y < 0 ) {
			this.currentAnim = this.anims.jump;
		}
		else if( this.vel.y > 0 ) {
			this.currentAnim = this.anims.fall;
		}
		else {
			this.currentAnim = this.anims.stand;
		}

		this.currentAnim.flip.x = this.flip;

		this.parent();
    

    },


    kill: function(no_explode) {

        var i = 0;

        if (!no_explode) {
            ig.game.score.points += 10;
            for (i = 0; i < 3; i += 1) {
                ig.game.spawnEntity( EntityDebrisParticle, this.pos.x, this.pos.y );
            }
        }

        this.parent();

    }


});


});
