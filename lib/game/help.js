ig.module(
    'game.help'
).requires(
	'game.base'
).
defines(function() {

Help = Base.extend({ 

    text: null,
    timer: new ig.Timer(),
    clearColor: '#000',
	// backdrop: new FullsizeBackdrop( 'media/splash.png' ),
    bush: false,


    init: function() {

        this.parent();

        if (!ig.ua.mobile) {
            ig.input.initMouse();
            this.spawnEntity(EntityCrosshair); 
        }

    },

    update: function() {

        if (this.touch.firstTouch) {
             ig.system.setGame(Splash);
        }

        this.parent();
    },

    draw: function() {
        this.parent();

            ig.draw.text('The Good: ', 100, 40, '18px', '#fff', 'rgba(0,0,0,0.4)');
            ig.draw.text('The Bad: ', 100, 100, '18px', '#fff', 'rgba(0,0,0,0.4)');
            ig.draw.text('The Powerups: ', 100, 160, '18px', '#fff', 'rgba(0,0,0,0.4)');




    }

});

});


