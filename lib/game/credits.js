ig.module(
    'game.credits'
).requires(
	'game.base'
).
defines(function() {

Credits = Base.extend({ 

    text: null,
    timer: new ig.Timer(),
    // clearColor: '#0E232E',
    backdrop: new FullsizeBackdrop( 'media/bg_mountains.png' ),

    wabbit: false,
    minion: false,
    minion2: false,


    init: function() {

        this.parent();

        if (!ig.ua.mobile) {
            ig.input.initMouse();
            this.spawnEntity(EntityCrosshair); 
        }

        this.wabbit = new ig.Image('media/splash_bunny.png');
        this.minion = new ig.Image('media/bouncer.png');
        this.minion2 = new ig.Image('media/bomber.png');

    },

    update: function() {

        if (this.touch.firstTouch) {
             ig.system.setGame(Splash);
        }

        this.parent();
    },

    draw: function() {
        this.backdrop.draw(0, this.bgOffsetY);
        ig.draw.rect(0,0,480,180,'#0E232E');

            ig.draw.text('Programming & Graphics', 100, 40, '18px', '#fff', 'rgba(0,0,0,0.4)');
            ig.draw.text('@eoinmcg', 120, 60, '18px', '#f0f', 'rgba(0,0,0,0.2)');
            ig.draw.text('Music By', 100, 100, '18px', '#fff', 'rgba(0,0,0,0.4)');
            ig.draw.text('DST', 120, 120, '18px', '#f0f', 'rgba(0,0,0,0.4)');
            ig.draw.text('http://nosoapradio.us', 120, 140, '16px', '#f0f', 'rgba(0,0,0,0.4)');


        this.minion2.drawTile(100, 218, 2, 36, 36);
        this.minion.drawTile(150, 210, 4, 35, 43);
        this.minion.drawTile(250, 210, 4, 35, 43, true);
        this.minion2.drawTile(300, 218, 2, 36, 36);
        this.wabbit.draw(200, 200); 

        this.parent();




    }

});

});



