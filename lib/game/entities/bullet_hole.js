ig.module(
    'game.entities.bullet_hole'
)
.requires(
    'impact.entity'
)
.defines(function() {

EntityBullet_hole = ig.Entity.extend({

	size: {x: 48, y: 48},
    animSheet: new ig.AnimationSheet( 'media/bullet_hole.png', 48, 48 ),	
    maxVel: {x: 100, y: 0},
	friction: {x: 600, y: 0},
    moving: false,



    init: function(x, y, settings) {

        this.parent(x, y, settings);

		this.addAnim( 'idle', 0.1, [0] );

        this.pos.x = x;
        this.pos.y = y;

        this.currentAnim.alpha = ~~(Math.random() * 100) ;
        this.currentAnim.angle = ~~(Math.random() * 360);

    }



});

});


