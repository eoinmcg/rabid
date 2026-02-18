ig.module(
    'game.entities.reload'
).requires(
    'impact.entity'
).
defines(function() {


EntityReload = ig.Entity.extend({

    size: {x: 52, y: 62},
	maxVel: {x: 100, y: 0},
	friction: {x: 600, y: 0},
	accelAir: 200,

    animSheet: new ig.AnimationSheet('media/bullet.png', 52, 62),
    moving: false,

    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.B,

    opacity: 0,
    fade: 0.1,

    ctx: null,
    textIncrease: 1,
    textMsg: '',
    textMin: 20,
    textMax: 40,
    textSize: 0,
    centerX: 0,

    init: function(x, y, settings) {
   
        x = ig.system.width / 2 - (this.size.x / 2);
        y = 5;

        this.parent(x, y, settings);
		this.addAnim( 'idle', 0.1, [0] );
        this.currentAnim.alpha = 0;

        this.ctx = ig.system.context;
        this.centerX = ig.system.width / 2;

        this.textSize = this.textMin;
        this.textMsg = ig.TR.get('reload');

    },


    update: function() {
  
        this.currentAnim.alpha = this.opacity;

        if (ig.game.bullets > 0) {
            this.kill();
        }

        if (this.opacity < 1) {
               this.opacity += this.fade;
        }

        this.textSize += this.textIncrease;
        if (this.textSize > this.textMax || this.textSize < this.textMin) {
            this.textIncrease  *= -1;
        }

        this.parent();
    },


    draw: function() {
   
        this.parent();

        var x;

        this.ctx.font = this.textSize+'px Arial';
        x = this.centerX - ( this.ctx.measureText(this.textMsg).width / 2);
        this.ctx.fillStyle = '#000';
        this.ctx.fillText(this.textMsg, x+ 1 , 51);
        this.ctx.fillStyle = '#fff';
        this.ctx.fillText(this.textMsg, x, 50);


    },


    receiveDamage: function() {
        ig.game.bullets = 6;
        ig.game.sfx.reload.play();
        this.kill();
        this.fade = -0.05;
    }

});

});
