ig.module(
    'plugins.rays'
)
.requires(
    'impact.impact'
).defines(function() {

    ig.Rays = {
    
    canvas: false,
    ctx: false,
    interval: false,
    offset: 0,
    w: null,
    h: null,
    col: null,
    bgcol: null,

    init: function(col, bgcol){

        this.ctx = ig.system.context;

        this.col = col || 'yellow';
        this.bgcol = bgcol || 'orange';

        this.w = ig.system.width;
        this.h = ig.system.height;

        this.startX = 401;
        this.startY = 57;


    },
    getXY: function(x, y, d, a){
        return {
            x: x + d * Math.cos(a),
            y: y + d * Math.sin(a)
        };
    },
    draw: function(){

        this.offset += 0.005;

        var length = Math.max(ig.system.width, ig.system.height),
            midx = this.startX,
            midy = this.startY,
            d = 7, i;

        // this.ctx.fillStyle = this.bgcol;
        // this.ctx.fillRect(0,0,this.w, this.h);

        this.ctx.fillStyle = this.col;

        for (i = 0; i < d; i++) {

            angle = (Math.PI * 2 / d) * i + this.offset;

            this.ctx.moveTo(midx, midy);
            c1 = this.getXY(midx, midy, length, angle + d / 100);
            this.ctx.lineTo(c1.x, c1.y);
            c2 = this.getXY(midx, midy, length, angle - d / 100);
            this.ctx.lineTo(c2.x, c2.y);
            this.ctx.lineTo(midx, midy);
            this.ctx.fill();
        }
        
        this.ctx.beginPath();
        this.ctx.arc(midx, midy, 30,
            0, Math.PI * 2, true);
        this.ctx.closePath();
        this.ctx.fill();

    }
};

});

