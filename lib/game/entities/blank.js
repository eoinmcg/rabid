ig.module(
	'game.entities.blank'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBlank = ig.Entity.extend({

	size: {x: 16, y: 16},
	maxVel: {x: 0, y: 0},
	friction: {x: 0, y: 0},

	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.B,
	collides: ig.Entity.COLLIDES.PASSIVE,

	health: 10,
    speed: 0,
    timer: null,

    init: function(x, y, settings) {
    

        x = x - (this.size.x / 2);
        y = y - (this.size.y / 2);

        this.parent(x, y, settings);

        this.timer = new ig.Timer();
        this.timer.set(0.2);



    },

    update: function() {

	
		this.parent();
    
        if (this.timer.delta() > 0) {
            this.kill();
        }

    },

	check: function( other ) {
		other.receiveDamage( 10, this );
		this.kill();
	}	



});
});
