ig.module(
	'game.entities.jetpacker'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityJetpacker = EntityCreature.extend({

    name: 'jetpacker',
	size: {x: 36, y: 40},
    animSheet: new ig.AnimationSheet( 'media/jetpacker.png', 36, 40 ),	
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
    timer: 0,
    fireFrame: 2,
    shotStrength: 0.1,
    points: 25,

    init: function(x, y, settings) {
    
        this.flip = settings.flip || false;
        this.speed = settings.speed || 70;

        x = (this.flip) ? ig.system.width + this.size.x : 0 - this.size.x;
        y = 50;

        // this.size.x = 20;
        this.size.y = 30;
        // this.offset.x = 6;
        this.offset.y = 6;

        this.parent(x, y, settings);

		this.addAnim( 'fly', 0.1, [2,3] );
		this.addAnim( 'shoot', 0.5, [1,0,1]);

        this.currentAnim = this.anims.fly.rewind();
        this.vel.y = 1;

        this.shoot = ~~( Math.random() * 50 ) + 50;
        this.hasShot = false;

    },

    update: function() {

        this.timer += 1;


        if (!this.hasShot && this.timer >= this.shoot) {
            this.currentAnim = this.anims.shoot.rewind();
            this.hasShot = true;
            // ig.game.health.health -= 5;
        }

		var xdir = this.flip ? -1 : 1;
		this.vel.x = this.speed * xdir;

        if (this.vel.y === 0) {
            this.vel.y = -(Math.random() * 300);
        }

		this.currentAnim.flip.x = !this.flip;

		this.parent();
    

    },


    receiveDamage: function(other) {
        // this.health -= 5;
        // this.vel.y = -(Math.random() * 200);
        // if (this.health < 1) {
        this.kill();
        // }
    }



});


});

