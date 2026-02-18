ig.module(
    'game.entities.bonus'
)
.requires(
    'impact.entity'
)
.defines(function() {

EntityBonus = ig.Entity.extend({

    opacity: 1,
	size: {x: 20, y: 22},
    animSheet: new ig.AnimationSheet( 'media/skull_bonus.png', 20, 22 ),	

    init: function(x, y, settings) {

        var total_shots = ig.game.shots.length,
            last_4 = ig.game.shots.substring(total_shots - 4, total_shots);



        this.text = settings.text || '';
        this.frame = settings.frame || 0;
        this.parent(x, y, settings);

        this.addAnim( 'idle', 0.1, [this.frame] );
        // this.addAnim( 'gold', 0.1, [1] );
        // this.addAnim( 'black', 0.1, [2] );
        // this.addAnim( 'red', 0.1, [3] );


        this.pos.x = x;
        this.pos.y = y;

        this.vel.x = this._rand(200, -200) - 200;
        this.vel.y = -900;

    },


    _rand: function(max, min) {
        return ~~(Math.random() * (max - min + 1)) + 0;
    },


    update: function() {
   
        this.opacity -= 0.03;

        if (this.opacity <= 0) {
            this.kill();
        }

        this.parent();

    },

    draw: function() {

        this.parent();
        // this.font.draw(this.text, this.pos.x, this.pos.y, this.opacity);

    }

});

});

