ig.module(
	'game.entities.bouncer'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityBouncer = EntityCreature.extend({

    name: 'bouncer',
	size: {x: 35, y: 43},
    animSheet: new ig.AnimationSheet( 'media/bouncer.png', 35, 43 ),	
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
    isShooting: false,
    shotDelay: 1,
    timer: false,
    fireFrame: 6,
    shotStrength: 1,
    points: 10,

    init: function(x, y, settings) {
    
        this.flip = settings.flip || false;
        this.speed = settings.speed || 70;

        this.size.x = 20;
        this.size.y = 37;
        this.offset.x = 6;
        this.offset.y = 6;

        x = (this.flip) ? ig.system.width - this.size.x : 0;
        y = ig.system.height - 150;

        this.parent(x, y, settings);

		this.addAnim( 'fall', 0.1, [0] );
		this.addAnim( 'stand', 0.1, [1] );
		this.addAnim( 'jump', 0.1, [2] );
		this.addAnim( 'shoot', 0.2, [4,5,7,7,7,7,7,7,7,7] );
		this.addAnim( 'fire', 0.2, [6,6,7,7,7,7,7] );
    },


    update: function() {

		var xdir = this.flip ? -1 : 1,
            xpos = this.pos.x;

		this.vel.x = this.speed * xdir;

        if (this.vel.y === 0 && !this.isShooting) {
            if ((Math.random() * 10) > 8) {
                this.isShooting = true;
                this.timer = new ig.Timer();
                this.timer.set(this.shotDelay);
                this.currentAnim = this.anims.shoot;
            } else {
                this.vel.y = -(Math.random() * 200);
            }
        }

		if ( this.vel.y < 0 && !this.isShooting ) {
			this.currentAnim = this.anims.jump;
		}
		else if( this.vel.y > 0 && !this.isShooting) {
			this.currentAnim = this.anims.fall;
		}
		else if (!this.isShooting){
			this.currentAnim = this.anims.stand;
		}

		this.parent();

		this.currentAnim.flip.x = this.flip;


        if (this.isShooting) {
            this.pos.x = xpos;

            if (this.timer.delta() > 0) {
                this.isShooting = false;
            } else if (this.timer.delta() > -(this.shotDelay / 2)) {
                this.currentAnim = this.anims.fire;
            }
        }
    

    }


    // kill: function(no_explode) {

    //     var i = 0;

    //     if (!no_explode) {
    //         ig.game.score.points += 10;
    //         for (i = 0; i < 3; i += 1) {
    //             ig.game.spawnEntity( EntityDebrisParticle, this.pos.x, this.pos.y );
    //         }
    //     }

    //     this.parent();

    // }


});


});
