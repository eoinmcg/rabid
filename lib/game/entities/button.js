ig.module(
	'game.entities.button'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityButton = ig.Entity.extend({

    name: 'button',
	size: {x: 32, y: 32},

    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,

	accelGround: 0,
	accelAir: 0,
    speed: 0,
    gravity: 0,

    ignorePause: true,

    init: function(x, y, settings) {
    
        this.parent(x, y, settings);
        this.x = x;
        this.y = y;

    },

    update: function() { 
        // this.parent();
        var col = false;

        this.pos.x = this.x;
        this.pos.y = this.y;

        if (ig.game.paused && ig.game.touch.firstTouch) {

            if (this.checkCollison(ig.game.touch.x, ig.game.touch.y)) {
                this.receiveDamage();
            } 
            
        }
    },


     checkCollison: function(x, y) {
            return true; 
     },

    receiveDamage: function() {

        var reload, i;

        ig.game.paused = !ig.game.paused;
        if (ig.game.paused) {

            ig.game.bullets += 1;
            reload = ig.game.getEntitiesByType('EntityReload');

            for (i = 0; i < reload.length; i += 1) {
                reload[i].kill();
            }
        }
    },

    draw: function() {
    
        if (ig.game.paused) {
               ig.system.context.fillStyle = '#fff';
 
        }
        ig.system.context.fillStyle = (ig.game.paused) ?
            'rgba(255,255,255,1)' : 'rgba(255,255,255,0.7)';
        ig.system.context.fillRect(this.x, this.y, 12, this.size.y);
        ig.system.context.fillRect(this.x + 20, this.y, 12, this.size.y);

    }




});


});



