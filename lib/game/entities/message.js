ig.module(
    'game.entities.message'
)
.requires(
    'impact.entity'
)
.defines(function() {

EntityMessage = ig.Entity.extend({

    text: '',
    opacity: 1,


    init: function(x, y, settings) {


        this.font = settings.font || ig.game.fontBig;

        this.text = settings.text || '';
        this.parent(x, y, settings);

        this.w = this.font.widthForString(this.text);

        this.pos.x = x || ig.system.width / 2 - (this.w / 2);
        this.pos.y = y;
        this.vel.y = -500;
        this.fade = settings.fade || 0.03;

       


    },


    update: function() {
   
        this.opacity -= this.fade;

        if (this.opacity <= 0) {
            this.kill();
        }

        this.parent();

    },

    draw: function() {

        this.parent();
        this.font.draw(this.text, this.pos.x, this.pos.y, this.opacity);

    }

});

});

