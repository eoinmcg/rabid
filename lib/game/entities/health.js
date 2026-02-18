ig.module(
    'game.entities.health'
).requires(
    'impact.entity'
).
defines(function() {


EntityHealth = ig.Entity.extend({


    health: 100,
    health_show: 100,
    max: 100,
    change: 0,

    init: function(x, y, settings) {
   
        x = 40;
        y = 10;
        this.parent(x, y, settings);


    },


    update: function() {
    
        if (this.health > this.max) {
            this.health = this.max;
        } else if (this.health < 0) {
            this.health = 0; 
        }

    },


    draw: function() {
   
        ig.system.context.fillStyle = '#c20';
        ig.system.context.strokeStyle = '#000';
        ig.system.context.fillRect(this.pos.x, this.pos.y, this.health, 10);
        ig.system.context.strokeRect(this.pos.x, this.pos.y, this.max, 10);
        ig.system.context.fillStyle = 'rgba(255,255,255,0.2)';
        ig.system.context.fillRect(this.pos.x + 1, this.pos.y + 5, this.health - 1, 5);
        // console.log(this.x, this.y, this.x + 100, this.y + 30);

    }



});

});


