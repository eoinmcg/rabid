ig.module(
	'game.entities.title'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityTitle = ig.Entity.extend({

	size: {x: 230, y: 105},
    animSheet: new ig.AnimationSheet( 'media/title.png', 230, 105 ),	
    opacity: 0,


    init: function(x, y, settings) {
    

        this.x = (ig.system.width / 2) - (this.size.x / 2);
        this.y = 20;

		this.addAnim( 'idle', 0.1, [0] );

        this.parent(x, y, settings);

        this.timer = new ig.Timer();
        this.timer.set(0.2);
        this.zindex = -10;



    },

    update: function() {


        if (this.opacity < 1) {
            this.opacity += 0.07;       
        }
        this.currentAnim.alpha = this.opacity;
        this.pos.x = this.x;	
        this.pos.y = this.y;	
    

    }



});
});
