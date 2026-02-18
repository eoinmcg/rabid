ig.module("game.splash")
  .requires("game.base")
  .defines(function () {
    Splash = Base.extend({
      text: null,
      timer: new ig.Timer(),
      // clearColor: '#69a',
      backdrop: new FullsizeBackdrop("media/splash.png"),
      bush: false,

      init: function () {
        var n;

        this.timer.set(0.5);

        this.spawnEntity(EntityTitle);

        this.parent();
        window.scroll(0, 1);
        this.bgOffsetY = 100;

        if (!ig.ua.mobile) {
          ig.music.play("splash");
        }

        this.grads = [];
        for (n in ig.gradients) {
          if (ig.gradients.hasOwnProperty(n)) {
            this.grads.push(n);
          }
        }
        this.currGrad = 0;
        this.gradTimer = new ig.Timer();
        this.gradChange = 10;
        this.gradTimer.set(this.gradChange);

        this.spawnEntity(GUI_Button, -500, 150, {
          text: ig.TR.get("play"),
          flash: true,
          callback: function () {
            ig.game.sfx.reload.play();
            ig.global.fader.col = "0,0,0";
            ig.global.fader.callback = Play;
            ig.music.stop();
            ig.system.setGame(Fader);
          },
        });
        this.spawnEntity(GUI_Button, -600, 190, {
          text: ig.TR.get("more"),
          callback: function () {
            window.location = "https://eoinmcg.itch.io";
            ig.global.fader.col = "0,0,0";
            ig.global.fader.callback = Credits;
            ig.music.stop();
            ig.system.setGame(Fader);
          },
        });

        if (!ig.ua.mobile) {
          this.spawnEntity(GUI_Credits, 400, 10, {
            text: ig.TR.get("credits"),
            callback: function () {
              // window.location = '/';
              ig.global.fader.col = "0,0,0";
              ig.global.fader.callback = Credits;
              ig.music.stop();
              ig.system.setGame(Fader);
            },
          });

          ig.input.initMouse();
          this.spawnEntity(EntityCrosshair);
        }
      },

      update: function () {
        var x, y;

        this.parent();

        if (this.touch.firstTouch) {
          x = ~~this.touch.x;
          y = ~~this.touch.y;

          this.sfx.shoot.play();
          this.spawnEntity(GUI_Pointer, x, y);
        }

        if (this.gradTimer.delta() > 0) {
          this.gradTimer.set(this.gradChange);
          this.currGrad += 1;
          this.currGrad = this.currGrad > this.grads.length ? 0 : this.currGrad;
        }

        if (this.bgOffsetY > 0) {
          this.bgOffsetY -= 2;
        } else if (this.bgOffsetY === 0 && !this.bush) {
          this.bush = true;
          this.spawnEntity(EntitySplash_bunny, -90, 175);
          this.spawnEntity(EntityBush, -100, 175);
        }
      },

      draw: function () {
        this.drawGradient("day");
        this.backdrop.draw(0, this.bgOffsetY);
        this.font.draw("HI: " + this.hiScore, 200, 10, ig.Font.ALIGN.CENTER);
        this.parent();
      },
    });
  });
