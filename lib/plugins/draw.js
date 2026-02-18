ig.module(
    'plugins.draw'
).requires(
	'impact.impact'
).
defines(function() {

    ig.draw = {
    
        ctx: null,
        fontFace: null,
        fontSize: null,

        init: function(settings) {
       
            settings = settings || {};

            this.ctx = ig.system.context; 
            this.fontSize = settings.fontSize || '12px';
            this.fontFace = settings.fontFace || 'Ribeye, Arial';

        },

        rect: function(x, y, w, h, col) {
        
            this.ctx.fillStyle = col;
            this.ctx.fillRect(x,y,w,h);

        },

        circle: function(x, y, r, col) {
        
        
        },

        text: function(str, x, y, size, col, shadow) {

            size = size || this.fontSize;

            this.ctx.font = size + ' ' + this.fontFace;

            x = x || (ig.system.width / 2) - (this.ctx.measureText(str).width / 2);

            if (shadow) {
                this.ctx.fillStyle = shadow; 
                this.ctx.fillText(str, x - 2, y + 2);
            }

            this.ctx.fillStyle = col;
            this.ctx.fillText(str, x, y);

        }


    
    };


});



