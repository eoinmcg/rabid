ig.module(
	'game.entities.bomber'
)
.requires(
	'game.entities.creature',
	'impact.entity'
)
.defines(function(){

EntityBomber = EntityCreature.extend({

    name: 'bomber',
	size: {x: 36, y: 36},
    animSheet: new ig.AnimationSheet( 'media/bomber.png', 36, 36 ),	
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
    fireFrame: -1,
    countdownTimer: null,
    countdown: null,
    shotStrength: 20,
    mode: 'run',
    points: 20,

    init: function(x, y, settings) {
    
        this.flip = settings.flip || false;
        this.speed = settings.speed || 70;

        this.size.x = 20;
        this.size.y = 30;
        this.offset.x = 8;
        this.offset.y = 6;

        x = (this.flip) ? ig.system.width - this.size.x : 0;
        y = ig.system.height - 150;

        this.countdownTimer = new ig.Timer();
        this.countdownTimer.set(3);

        this.parent(x, y, settings);

		this.addAnim( 'walk', 0.1, [0,1] );
		this.addAnim( 'detonate', 0.1, [2] );
    },


    update: function() {

		var xdir = this.flip ? -1 : 1,
            xpos = this.pos.x;

		
        this.countdown = ~~( this.countdownTimer.delta() * -1 );
		this.vel.x = this.speed * xdir;

        if (this.countdown === 0) {
            this.vel.x = 0;
            if (!this.hasSpoken) {
                ig.game.sfx.laugh.play();
                this.hasSpoken = true;
            }
            this.currentAnim = this.anims.detonate;
        }
        if (this.countdown === -1) {
            ig.game.sfx.boom.play();
            ig.game.spawnEntity(EntityExplosion);
            ig.game.health.health -= this.shotStrength;
            this.kill(); 
        }


		this.parent();

		this.currentAnim.flip.x = this.flip;


    },


    draw: function() {
    
        this.parent();
        ig.game.font.draw(this.countdown + 1, this.pos.x, this.pos.y - 10);
    }




});


});

