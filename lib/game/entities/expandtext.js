ig.module(
    'game.entities.expandtext'
)
.requires(
    'impact.entity'
)
.defines(function() {

EntityExpandtext = ig.Entity.extend({

	font: new ig.Font( 'media/8_bit_wonder_font.png' ),
    text: '',
    opacity: 1,
    ctx: null,
    textIncrease: 1,
    textMsg: '',
    textMin: -10,
    textMax: 50,
    textSize: 10,
    centerX: 0,
    webfont: 'Ribeye, Arial',
    timer: new ig.Timer(),


    init: function(x, y, settings) {

        this.ctx = ig.system.context;
        this.text = settings.text || '';
        this.parent(x, y, settings);

        // this.textMsg = ig.TR.get(settings.text);
        this.textMsg = settings.text;
        this.textCol = settings.textCol || '#000';
        this.textShadow = settings.textShadow || 'rgba(255,255,255,0.4)';

        this.pos.x = x;
        this.pos.y = y;

        this.ctx.font = this.textSize+'px ' + this.webfont;
        this.centerX = ig.system.width / 2;
        this.y = ig.system.height / 2;

        this.parent();

    },


    update: function() {
  


        this.textSize += this.textIncrease;
        if (this.textSize > this.textMax || this.textSize < this.textMin) {
            this.opacity -= 0.05;
        }

        if (this.opacity < 0) {
            this.kill();
        }

    },

    draw: function() {


        this.ctx.globalAlpha = this.opacity;
        this.ctx.font = this.textSize+'px ' + this.webfont;
        this.x = this.centerX - ( this.ctx.measureText(this.textMsg).width / 2);
        // this.ctx.fillStyle = this.textShadow;
        // this.ctx.fillText(this.textMsg, this.x+ 1 , this.y+1);
        this.ctx.fillStyle = this.textCol;
        this.ctx.fillText(this.textMsg, this.x, this.y);
        this.ctx.globalAlpha = 1;

    }

});

});

