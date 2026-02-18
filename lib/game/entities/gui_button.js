ig.module(
    'game.entities.gui_button'
)
.requires(
    'impact.entity'
)
.defines(function(){

GUI_Button = ig.Entity.extend({

    name: 'gui_button',
    size: {x: 100, y: 30},

    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,

	accelGround: 0,
    speed: 5,
    gravity: 0,

    ignorePause: true,
    animSheet: new ig.AnimationSheet( 'media/gui_button.png', 100, 30 ),	

    init: function(x, y, settings) {

        this.font = ig.game.font;

        this.parent(x, y, settings); 
        this.text = settings.text || '????';
        this.maxVel.y = 0;
        this.maxVel.x = 500;
        this.vel.y  = 0;
        this.vel.x += settings.velX || 500;
        this.stopX = settings.stopX || ig.system.width / 2 - (this.size.x / 2); 

        this.addAnim('idle', 1, [0]);

        this.opacity = 1;
        this.flash = settings.flash || false;

        this.callback = settings.callback || function() { console.log('hit  '+ this.text); };


    },


    update: function() {
        this.parent();    

        this.textW = this.font.widthForString(this.text);
        this.textX = this.pos.x + (this.textW / 2);

        if (this.pos.x > this.stopX) {
            this.vel.x = 0;
            this.pos.x = this.stopX;
        }


        if (this.flash) {
            var time = new Date().getTime() * 0.002;
            this.opacity = Math.sin(time * 0.9) + 1;
        }            

    },

    draw: function() {
        this.parent();
        ig.game.font.draw(this.text, this.textX, this.pos.y + 5, this.opacity);
    
    },


    receiveDamage: function(hit, other) {
        ig.game.spawnEntity(EntityBullet_hole, other.pos.x - 24, other.pos.y - 24);
        this.pos.y -= 2;
        this.callback();
    }




});


GUI_Credits = ig.Entity.extend({

    name: 'credits_button',
    size: {x: 80, y: 20},
    gravity: 0,
    maxVel: {x: 0, y: 0},

    collides: ig.Entity.COLLIDES.PASSIVE,
    type: ig.Entity.TYPE.A,

    init: function(x, y, settings) {

        this.parent(x, y, settings);
        this.text = settings.text || 'Credits';
        this.callback = settings.callback;
        this.x = x;
        this.y = y;
    },

    update: function() {},

    draw: function() {
        this.parent();
        ig.game.font.draw(this.text, this.x, this.y, 0.7);
    
    },

    receiveDamage: function(hit, other) {
        ig.game.spawnEntity(EntityBullet_hole, other.pos.x - 24, other.pos.y - 24);
        this.pos.y -= 2;
        this.callback();
    }

});


GUI_Pointer = ig.Entity.extend({

    ttl: 3,
    size: {x: 3, y: 3},
    gravity: 0,
    maxVel: {x: 0, y: 0},
    name: 'gui_pointer',

    collides: ig.Entity.COLLIDES.PASSIVE,
	type: ig.Entity.TYPE.NONE,
    checkAgainst: ig.Entity.TYPE.A,

    init: function(x, y, settings) {

        this.parent(x, y, settings);
    },


    update: function() {
        this.ttl -= 1;
        if (this.ttl <= 0) {
            this.kill();
        }
        this.parent(); 
    },


    check: function(other) {
        other.receiveDamage(10, this);
    }




});


});
