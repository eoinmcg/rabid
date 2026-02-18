ig.module(
    'game.gameover'
).requires(
	'game.base'
).
defines(function() {

GameOver = Base.extend({ 

    text: 'game_over',
	backdrop: new FullsizeBackdrop( 'media/gameover.png' ),
    timer: null,
    newHi: false,

    init: function() {

        this.parent();

        if (SF.data.ads) {
            this.ad.style.display = 'block';
            // this.adLarge.style.display = 'block';
        }
   
        this.text = ig.TR.get('game_over');
        this.textX = (ig.system.width / 2) - ( this.font.widthForString(this.text) / 2);


        this.newHi = ig.global.newHi;
        console.log(this.newHi, ig.global.newHi, typeof this.newHi);
        ig.global.newHi = false;

        if (!ig.ua.mobile) {
            ig.music.stop();
        }

    },

    update: function() {
    
        if (this.touch.firstTouch) {
             ig.system.setGame(Splash);
        }

        this.parent();

        this.timer += 1;

        if (this.timer === 50) {
            this.sfx.shoot.play();
            this.spawnEntity(EntityBullet_hole, 100, 100); 
        } else if (this.timer === 100) {
            this.sfx.shoot.play();
            this.spawnEntity(EntityBullet_hole, 300, 140); 
        } else if (this.timer === 150) {
            this.sfx.shoot.play();
            this.spawnEntity(EntityBullet_hole, 120, 190); 
        } else if (this.timer === 200 && this.newHi) {
            this.sfx.combo.play();
        }
    },

    draw: function() {

        this.backdrop.draw();
        this.parent();


        var time = new Date().getTime() * 0.002,
                    opacity = Math.sin(time * 0.9) + 1,
                    accuracy = ( ig.global.score.killed / ig.global.score.shots) * 100;

        if (!this.newHi || (this.newHi && this.timer < 175)) {
            ig.draw.text(ig.TR.get('game_over').toUpperCase(), false, 50, '40px', 
                    'rgba(50,0,0,'+opacity+')', 
                    'rgba(255,255,255,0.05)');
        }
        
        if (this.newHi && this.timer > 175) {
            ig.draw.text(ig.TR.get('new_hiscore').toUpperCase(), false, 50, '40px', 
                    'rgba(255,255,62,'+opacity+')', 
                    'rgba(255,255,255,0.05)');
        

            if (this.timer % 7 === 0) {
                ig.game.spawnEntity( EntitySkull, 
                    ~~(Math.random() * ig.system.width), 
                    ~~(Math.random() * ig.system.height));

            }

        }

        if (this.timer > 50) {
            ig.draw.text(ig.TR.get('kills') + ': ' + ig.global.score.killed, 170, 110, '18px', '#fff', 'rgba(0,0,0,0.4)');
        
        }

        if (this.timer > 100) {
            ig.draw.text(ig.TR.get('score') + ': ' + ig.global.score.points, 170, 140, '18px', '#fff', 'rgba(0,0,0,0.4)');
        
        }

        if (this.timer > 150) {
            ig.draw.text(ig.TR.get('accuracy') + ': ' + ~~(accuracy) + '%', 170, 170, '18px', '#fff', 'rgba(0,0,0,0.4)');
        
        }
    }

});

});

