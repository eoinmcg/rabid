ig.module(
	'game.entities.creature'
)
.requires(
	'impact.entity'
)
.defines(function(){

EntityCreature = ig.Entity.extend({

    name: 'generic',
    isNasty: true,
    hasSpoken: false,
    fireFrame: null,
    shotStrength: 2,
    points: 0,

    init: function(x, y, settings) {
    
        this.parent(x, y, settings);

        this.offscreenL = 0 - this.size.x - 1;
        this.offscreenR = ig.system.width + this.size.x + 1;
    },


    update: function() {
    

        if (this.isNasty && this.currentAnim.frame === this.fireFrame) {
            if (!this.hasSpoken && Math.random() * 10 < 1) {
                ig.game.sfx.hiya.play();
                this.hasSpoken = true;
            }
            // console.log(this.name, this.fireFrame, this.currentAnim.frame, this.shotStrength);
            ig.game.health.health -= this.shotStrength;
        }


        // check offscreen
		if ( this.offscreen() ) {
            this.kill(false);
            if (this.isNasty) {
                ig.game.escaped += 1;
            }
		}

        this.parent();

    },


    draw: function() {
    

        this.parent();

        //    ig.game.font.draw('' + this.currentAnim.frame, this.pos.x, this.pos.y);
        // if (this.isNasty && this.currentAnim.frame == this.fireFrame) {
        //    ig.game.font.draw('BANG!', this.pos.x, this.pos.y);

        // }
        // if (this.isNasty) {
          // ig.draw.rect(this.pos.x, this.pos.y, this.size.x, this.size.y /2, 'rgba(255,0,255,0.5)');  
          // ig.draw.rect(this.pos.x, this.pos.y, this.size.x, this.size.y, 'rgba(255,0,255,0.5)');  
        // }


    },


    kill: function(playDeathAnim) {


        if (typeof playDeathAnim === 'undefined') {
            playDeathAnim = true;
        }


        if (playDeathAnim) {
            this.deathAnim(); 
        }

        if (this.isNasty) {
            ig.game.levelCount += 1;
        }

        this.parent(); 
    },


    deathAnim: function() {

        var i;

        ig.game.score.points += this.points;
        for (i = 0; i < 4; i += 1) {
            ig.game.spawnEntity( EntityDebrisParticle, this.pos.x, this.pos.y );
        }
 
    },


    offscreen: function() {

        return (this.pos.x > this.offscreenR || this.pos.x < this.offscreenL);

    }



});


});
