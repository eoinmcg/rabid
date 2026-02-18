ig.module(
	'game.entities.crosshair'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCrosshair = ig.Entity.extend({

	size: {x: 32, y: 32},
    animSheet: new ig.AnimationSheet( 'media/crosshair.png', 32, 32 ),	
	maxVel: {x: 0, y: 0},
	friction: {x: 0, y: 0},
    ignorePause: true,


    init: function(x, y, settings) {
    
        x = -100;
        y = -100;
        this.parent(x, y, settings);
		this.addAnim( 'idle', 0.1, [0] );

        this.zIndex = 1000;

    },

    update: function() {
        this.pos.x = ( ig.input.mouse.x ) - ( this.size.x / 2 );
        this.pos.y = ( ig.input.mouse.y ) - (this.size.y / 2);
        this.parent();

    }




});
});

