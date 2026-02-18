ig.module( 
	'game.base' 
)
.requires(
	'impact.game',
	'impact.font',
    // 'impact.debug.debug',

    'game.entities.title',
    'game.entities.particle',
    'game.entities.health',
    'game.entities.crosshair',
    'game.entities.debris',
    'game.entities.bullet',
    'game.entities.blank',
    'game.entities.creature',
    'game.entities.chick',
    'game.entities.bouncer',
    'game.entities.bomber',
    'game.entities.jetpacker',
    'game.entities.burrower',
    'game.entities.reload',
    'game.entities.message',
    'game.entities.bonus',
    'game.entities.powerup',
    'game.entities.expandtext',
    'game.entities.explosion',
    'game.entities.button',
    'game.entities.gui_button',
    'game.entities.bullet_hole',
    'game.entities.splash_bunny',
    'game.entities.mole',

    // 'plugins.resize',
    // 'plugins.rays',
    'plugins.translate',
    'plugins.levels',
    'plugins.draw',

    'game.levels.one_blank'
)
.defines(function(){


/**
* Simple random number generator
* returns number between min and max
* if no max is given return random between 0 and min
*
* @method rnd - generates a random number in a given range
* @param {Number} min value in range
* @param {Number} max value (if blank min becomes max and min is 0)
* @param {Boolean} [float=false] returns a float, otherwise rounded
* @return {Number} Returns random number
*/
ig.rnd = function(min, max, float) {

    var rnd = (max) ?
        Math.random() * (max - min) + min :
        Math.random() * min;

    return (float) ? rnd : ~~(rnd);
};


FullsizeBackdrop = ig.Image.extend({

    x: 0,
    xPos: 0,
    startd: false,
    speed: 2,

    start: function() {
        this.startd = true;
    },
	resize: function(){},
	draw: function(x, y) {


        x = x || 0;
        y = y || 0;

		if( !this.loaded ) { return; }
		ig.system.context.drawImage( this.data, x, y );

	}
});


ig.Font.inject({
    draw: function( text, x, y, alpha, align ) {
        ig.system.context.globalAlpha = alpha ? alpha : 1;
        this.parent( text, x, y, align );
        ig.system.context.globalAlpha = 1;
    }
});

if( ig.ua.mobile ) {
    ig.Sound.enabled = false;
}

ig.global.fader = {};

Base = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/8_bit_wonder_font.png' ),
	fontBig: new ig.Font( 'media/22_ribeye.png' ),
    clearColor: null,
	gravity: 300,
    touch: {
        x: 0,
        y: 0,
        hold: false,
        firstTouch: false
    },
    sfx: {
        'shoot': new ig.Sound('media/sfx/bang.*'),
        'empty': new ig.Sound('media/sfx/empty.*'),
        'reload': new ig.Sound('media/sfx/reload.*'),
        'ping': new ig.Sound('media/sfx/ping.*'),
        'combo': new ig.Sound('media/sfx/combo.*'),
        'hiya': new ig.Sound('media/sfx/hiya.*'),
        'laugh': new ig.Sound('media/sfx/laugh.*'),
        'boom': new ig.Sound('media/sfx/boom.*'),
        'hurt': new ig.Sound('media/sfx/hurt.*')
    },
    pausing: false,
    paused: false,
    canPause: false,
    ad: null,
    adLarge: null,
    hiScore: parseInt(localStorage.hiScore, 10)|| 100,
	
	init: function() {

        ig.input.bind( -1, "CanvasTouch" );
        if (!ig.baked) {
            ig.input.bind( ig.KEY.MINUS, 'screenshot' );
        }
        ig.draw.init(SF.data);

        if (!ig.ua.mobile) {
            ig.input.initMouse();
            this.spawnEntity(EntityCrosshair); 
        }

        this.ad = document.getElementById('ad');
        this.adLarge = document.getElementById('adLarge');
        if (SF.data.ads) {
            this.ad.style.display = 'block';
            // this.adLarge.style.display = 'block';
        }

        document.getElementById('o').innerHTML = '<p>'+ig.TR.get('rotate_device')+'</p>';

        this.initGradients();

        if (!ig.ua.mobile) {
            ig.music.add( 'media/music/splash.*', 'splash' );
            ig.music.add( 'media/music/main.*', 'main' );
            ig.Sound.enabled = true;
        } else {
            ig.Sound.enabled = false;
        }

        // ig.resize.scale();
        // window.addEventListener('resize', function(evt) {
        //     ig.resize.scale();
        // }, false);
        // window.addEventListener('orientationchange', function(evt) {
        //     window.scrollTo(0, 1);
        //     ig.resize.scale();
        // }, false);

        // SF.resizeHandler();

	},
	
	update: function() {


        this.getInput();
		this.parent();

        window.scrollTo(0,1);


        if (!ig.baked && ig.input.pressed('screenshot')) {
            var c = document.getElementsByTagName('canvas')[0],
                ajax = new XMLHttpRequest(),
                img = c.toDataURL('image/png'),
                params = 'img='+img;

                ajax.open('POST', 'img.php', true);
                ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                ajax.onreadystatechange = function() {
                    if(ajax.readyState == 4 && ajax.status == 200) {
                        console.log('saved img' + ajax.responseText);
                    }
                    console.log(ajax.responseText);
                };

                ajax.send(params);
        }

	},


    getInput: function() {
    
        var touchState = ig.input.state("CanvasTouch") || false;
        var firstTouch = (touchState === true && this.touch.hold === false) ? true : false;

        this.touch = {
            x: ig.input.mouse.x,
            y: ig.input.mouse.y,
            hold: ig.input.state("CanvasTouch") || false,
            firstTouch: firstTouch
        };
    },



    pause: function() {
    

        var time = new Date().getTime() * 0.002,
                opacity = Math.sin(time * 0.9) + 1;

        ig.system.context.fillStyle = 'rgba(0,0,0,0.7)';
        ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
        ig.draw.text(ig.TR.get('paused').toUpperCase(), false, 100, '30px', 
                'rgba(255,255,255,'+opacity+')', 
                'rgba(0,0,0,'+opacity+')');

    
    },


    initGradients: function() {
   
        var ctx = ig.system.context,
            grad;

        ig.gradients = {};

        grad = ctx.createLinearGradient(0,0,0,ig.system.height);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.5, '#69a');
        grad.addColorStop(1, 'yellow');
        ig.gradients.dawn = grad;

        grad = ctx.createLinearGradient(0,0,0,ig.system.height);
        grad.addColorStop(0, '#69a');
        grad.addColorStop(0.5, '#9cd');
        grad.addColorStop(1, '#fff');
        ig.gradients.day = grad;

        grad = ctx.createLinearGradient(0,0,0,ig.system.height);
        grad.addColorStop(0, '#036');
        grad.addColorStop(0.5, '#69a');
        grad.addColorStop(1, 'pink');
        ig.gradients.dusk = grad;

        grad = ctx.createLinearGradient(0,0,0,ig.system.height);
        grad.addColorStop(0, '#036');
        grad.addColorStop(1, 'black');
        ig.gradients.night = grad;

    },


    drawGradient: function(gradient) {
   
        var ctx = ig.system.context;

        ctx.fillStyle = ig.gradients[gradient];
        ctx.fillRect(0,0,ig.system.width,ig.system.height);

    }

});

});

