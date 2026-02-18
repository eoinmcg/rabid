var SF = {};

SF.data = {
    title: 'Rabid Rabbits',
    lang: 'en',
    orientation: 'landscape',
    ads: false,
    draw: {
        fontFace: 'Arial',
        fontSize: '12px'
    }
};

// this starts the game
window.addEventListener('load', function() {
    window.setTimeout(function(){
        ig.main( '#canvas', Splash, 60, 480, 288, 1 );
        SF.resizeHandler();
    }, 10);
}, false);


SF.data.phrases = {

    en: {
        'rotate_device': 'Please rotate your device',
        'tap_to_start': 'Tap to Start',
        'click_to_start': 'Click to Start',
        'wave': 'Wave',
        'play': 'Play',
        'more': 'More',
        'reload': 'RELOAD!',
        'game_over': 'GAME OVER',
        'new_hiscore': 'NEW HISCORE',
        'kills': 'Kills',
        'score': 'Score',
        'bullets': 'Bullets',
        'escaped': 'Escaped',
        'missed': 'Missed',
        'shots_fired': 'Shots Fired',
        'accuracy': 'Accuracy',
        'bonus': 'Bonus',
        'new_hi': 'New Hi Score!',
        'paused': 'Paused'
    },
    fr: {
        'rotate_device': 'Tournez votre appareil',
        'tap_to_start': 'Touche pour Jouer',
        'click_to_start': 'Clique pour Jouer',
        'wave': 'Attaque',
        'play': 'Jouer',
        'more': 'Plus',
        'reload': 'RECHARGER',
        'game_over': 'GAME OVER',
        'new_hiscore': 'MEILLEUR SCORE',
        'score': 'Score',
        'kills': 'Tués',
        'bullets': 'Balles',
        'escaped': 'Ratés',
        'missed': 'A coté',
        'shots_fired': 'Coups Tirés',
        'accuracy': 'Précision',
        'bonus': 'Bonus',
        'new_hi': 'Meilleur Score !',
        'paused': 'Pause'
    }

};




SF.resizeHandler = function() {

    var W = 480,
        H = 288,
        currentW = window.innerWidth / W,
        currentH = window.innerHeight / H,
        ratio = W / H,
        g = document.getElementById('game'),
        c = document.getElementById('canvas'),
        o = document.getElementById('o'),
        ad = document.getElementById('ad'),
        adLarge = document.getElementById('ad');

        // console.log(g.offsetHeight, g.height);
        // if (window.innerWidth >= 960) {
        //     c.style.width = '960px';
        //     c.style.height = '576px';
        // } else {
            c.style.width = '100%';
            c.style.height = Math.floor(H * currentW) + 'px';
        // }

        ad.style.left = ~~((window.innerWidth - 320) / 2) + 'px';
        ad.style.top = parseInt(window.innerHeight, 10) - 55  + 'px';

        if (window.innerWidth < 400) {
            o.style.display = 'block';
            c.style.display = 'none';
            ad.style.display = 'none';
        } else {
            o.style.display = 'none';
            c.style.display = 'block';
        }

        g.height = window.innerHeight + 20;
        window.setTimeout(function() {
            window.scrollTo(0, 1);
        }, 100);

};

window.addEventListener('resize', function(e) {
    SF.resizeHandler();
}, false);
window.addEventListener('orientationchange', function(e) {
    window.scrollTo(0, 1);
}, false);

