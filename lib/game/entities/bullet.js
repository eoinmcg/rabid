ig.module(
	'game.entities.bullet'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBullet = ig.Entity.extend({

	size: {x: 16, y: 16},
    animSheet: new ig.AnimationSheet( 'media/gunshot.png', 16, 16 ),	
	maxVel: {x: 0, y: 0},
	friction: {x: 0, y: 0},

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.PASSIVE,

	health: 10,
    speed: 0,
    timer: null,
    ignorePause: true,

    init: function(x, y, settings) {
    
		this.addAnim( 'shoot', 0.1, [0,1,2,3] );

        this.size.x = 8;
        this.size.y = 8;

        x = x - (this.size.x / 2);
        y = y - (this.size.y / 2);

        ig.game.last_bullet.x = x;
        ig.game.last_bullet.y = y;


        this.offset.x = 4;
        this.offset.y = 4;

        this.parent(x, y, settings);

        this.timer = new ig.Timer();
        this.timer.set(0.2);
        ig.game.score.shots += 1;

    },

    update: function() {

		this.parent();
    
        if (this.timer.delta() > 0) {
            this.kill();
            ig.game.shots += '0';
        }

    },



	check: function( other ) {
        var hit = (other.isNasty) ? other.name : false;
		other.receiveDamage( 10, this );
        ig.game.hit = true;
        ig.game.score.killed += 1;

        // check headshot
        if (hit) {
            var thirdY = ~~(other.size.y / 3);

            if (this.pos.y < other.pos.y + thirdY) {
                ig.game.shots += '1';
                ig.game.spawnEntity(EntityBonus, 
                    this.pos.x,
                    this.pos.y);
                ig.game.spawnEntity(EntityMessage,
                    this.pos.x,
                    this.pos.y - 30, {
                        text: '+10',
                        font: ig.game.font});
                ig.game.score.points += 10;
                ig.game.sfx.ping.play();
            }

        } else {
            ig.game.shots += '0';
        }

		this.kill();


	}	



});
});
