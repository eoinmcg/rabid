ig.module(
    'game.entities.explosion'
).requires(
    'impact.entity'
).
defines(function() {


EntityExplosion = ig.Entity.extend({


    rgb: '200,0,0',
    opacity: 1,
    fade: 0.07,
    ctx: null,

    init: function(x, y, settings) {
   
        this.parent(x, y, settings);
        this.rbg = settings.rgb || this.rgb;
        this.fade = settings.fade || this.fade;

        this.ctx = ig.system.context;

    },


    update: function() {

        this.opacity -= this.fade;

        if (this.opacity < 0) {
            this.kill();
        } 

    },


    draw: function() {
   
        // this.ctx.fillStyle = 'rbga('+this.rgb+','+this.opacity+')';
        this.ctx.fillStyle = 'rgba('+this.rgb+', 1)';
        this.ctx.globalAlpha = this.opacity;
        this.ctx.fillRect(0,0,ig.system.width, ig.system.height);
        this.ctx.globalAlpha = 1;


    }



});

});



