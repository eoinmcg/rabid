ig.module(
	'game.entities.splash_bunny'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntitySplash_bunny = ig.Entity.extend({

    name: 'splash_bunny',

	size: {x: 40, y: 54},
    animSheet: new ig.AnimationSheet('media/splash_bunny.png', 40, 54),	
    isMoving: false,
    timer: new ig.Timer(),
    dir: -1,

    init: function(x, y, settings) {
    
        this.parent(x, y, settings);
        this.x = x;
        this.y = y;

		this.addAnim( 'idle', 0.1, [0] );
        this.currentAnim = this.anims.idle;

        this.parent();

        this.pos.x = x;
        this.pos.y = y;

        this.reset();

        this.flip = true;

    },

    update: function() { 


        if (this.timer.delta() < 0) {
            return;
        }

        this.pos.y += ( 0.5 * this.dir);

        if (this.pos.y < 135) {
            this.dir *= -1;
        } else if (this.pos.y > 175) {
            this.dir *= -1;
            this.reset();
        }



    },

    reset: function() {

         this.timer.set( ~~(Math.random() * 3) + 2 );
   
    }


});


});



ig.module(
	'game.entities.bush'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityBush = ig.Entity.extend({

    name: 'bush',

	size: {x: 259, y: 60},
    animSheet: new ig.AnimationSheet('media/bush.png', 259, 60),	
    opacity: 0,
    bunny: false,

    init: function(x, y, settings) {
    
        this.parent(x, y, settings);
        this.x = x;
        this.y = y;

		this.addAnim( 'idle', 0.1, [0] );
        this.currentAnim = this.anims.idle;
        this.currentAnim.alpha = 0;

        this.parent();

    },

    update: function() { 
        this.pos.x = this.x;
        this.pos.y = this.y;
        this.opacity += 0.05;

        this.currentAnim.alpha = this.opacity;

        if (this.opacity > 1 && !this.bunny) {
            this.bunny = true; 
            ig.game.getEntitiesByType('EntitySplash_bunny')[0].pos.x *= -1;
        }

    }


});


});



