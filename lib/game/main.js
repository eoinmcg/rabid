/**
 * @preserve Rabid Rabbits
 * Copyright © 2013 Eoin McGrath @eoinmcg
 * More games at https://eoinmcg.itch.io
 * On the twitters: @eoinmcg
 */

ig.module("game.main")
  .requires(
    "game.base",
    "game.fader",
    "game.splash",
    "game.help",
    "game.credits",
    "game.gameover",
  )
  .defines(function () {
    Play = Base.extend({
      bullets: 6,
      timer: new ig.Timer(),
      last_bullet: { x: null, y: null },
      shots: "",
      hit: false,
      score: null,
      text_combo: "",
      level: 0,
      levelData: null,
      currentLevel: null,
      levelUp: new ig.Timer(),
      canPause: true,
      availEntities: null,
      baddies: 0,
      currBG: 0,
      gameOver: false,
      newHiScore: false,
      backdrops: [
        new FullsizeBackdrop("media/bg.png"),
        new FullsizeBackdrop("media/bg_forest.png"),
        new FullsizeBackdrop("media/bg_mountains.png"),
      ],

      init: function () {
        if (!ig.ua.mobile) {
          ig.music.stop();
          ig.music.play("main");
        }

        ig.input.bind(ig.KEY.P, "pause");

        this.loadLevel(LevelOne_blank);
        this.level = 0;
        this.levelData = ig.levels.data;

        this.shots = "";
        this.score = {
          escaped: 0,
          killed: 0,
          saved: 0,
          shots: 0,
          points: 0,
        };
        this.text_combo = ig.TR.get("combo");
        this.text_new_hi = ig.TR.get("new_hi");

        this.nextLevel();

        this.spawnEntity(EntityHealth);
        this.health = ig.game.getEntitiesByType(EntityHealth)[0];
        this.spawnEntity(EntityButton, ig.system.width - 50, 20, {});

        this.parent();

        this.ad.style.display = "none";
        this.adLarge.style.display = "none";
      },

      update: function () {
        if (this.isPaused() === true) {
          return false;
        }

        this.checkLevelFinished();

        this.checkGameOver();

        this.parent();

        this.spawnNext();
        this.checkShot();
        this.checkBonus();
        this.checkHiScore();

        this.hit = false;
      },

      isPaused: function () {
        var i;

        if (this.paused) {
          this.getInput();
          // only update some of the entities when paused:
          for (i = 0; i < this.entities.length; i++) {
            if (this.entities[i].ignorePause) {
              this.entities[i].update();
            }
          }
          return true;
        }
      },

      checkLevelFinished: function () {
        var self = this;

        if (this.levelCount >= this.baddies && !this.levelFinshed) {
          this.levelFinshed = true;
          window.setTimeout(function () {
            self.nextLevel();
          }, 2000);
        }
      },

      checkGameOver: function () {
        if (this.health.health === 0 && !this.gameOver) {
          this.sfx.laugh.play();
          ig.global.fader.col = "150,0,0";
          ig.global.fader.callback = GameOver;
          ig.global.score = this.score;
          ig.global.newHi = false;
          if (this.score.points > this.hiScore) {
            this.hiScore = this.score.points;
            localStorage.hiScore = this.score.points;
            ig.global.newHi = true;
          }
          this.gameOver = true;
          ig.system.setGame(Fader);
        }
      },

      spawnNext: function () {
        var rnd, type;

        if (this.levelCount < this.baddies && this.timer.delta() > 0) {
          this.timer.set(Math.random() * this.currentLevel.interval);

          rnd = ~~(Math.random() * (this.availEntities.length - 1));
          type = this.availEntities[rnd];

          this.spawnEntity("Entity" + type, ig.system.width / 2, -50, {
            flip: Math.random() * 2 > 1 ? true : false,
            speed: Math.random() * 80 + 100,
          });
        }
      },

      checkShot: function () {
        if (this.touch.firstTouch && this.bullets > 0) {
          x = this.touch.x;
          y = this.touch.y;

          this.bullets -= 1;
          this.sfx.shoot.play();
          this.spawnEntity(EntityBullet, x, y);

          if (this.bullets === 0 && this.getEntitiesByType("EntityReload")) {
            this.spawnEntity("EntityReload");
          }
        } else if (this.touch.firstTouch && this.bullets === 0) {
          x = this.touch.x;
          y = this.touch.y;
          this.sfx.empty.play();
          this.spawnEntity(EntityBlank, x, y);
        }
      },

      checkBonus: function () {
        if (!this.hit) {
          return;
        }

        var total_shots = this.shots.length,
          last_4 = this.shots.substring(total_shots - 4, total_shots);

        if (last_4 === "1111") {
          this.sfx.combo.play();
          this.spawnEntity(
            EntityBonus,
            this.last_bullet.x,
            this.last_bullet.y,
            {
              frame: 1,
            },
          );
          this.spawnEntity(
            EntityMessage,
            this.last_bullet.x,
            this.last_bullet.y - 30,
            {
              text: "+100",
              font: ig.game.font,
            },
          );
          ig.game.score.points += 100;
        }
      },

      checkHiScore: function () {
        if (!this.newHiScore && this.score.points > this.hiScore) {
          this.spawnEntity(EntityMessage, 200, 0, {
            text: this.text_new_hi,
            fade: 0.01,
          });

          this.newHiScore = true;
        }
      },

      draw: function () {
        this.backdrops[this.currBG].draw();
        this.parent();

        this.font.draw(this.score.points, 40, 30);

        if (this.paused) {
          this.pause();
        }

        if (this.levelFinshed) {
          ig.draw.rect(
            0,
            0,
            ig.system.width,
            ig.system.height,
            "rgba(0,0,0,0.05)",
          );
        }
      },

      killAll: function () {
        var i,
          creature = this.getEntitiesByType(EntityCreature);

        this.spawnEntity(EntityExplosion);

        for (i = 0; i < creature.length; i += 1) {
          if (creature[i].isNasty) {
            creature[i].kill();
          }
        }
      },

      clearAll: function () {
        var i,
          creature = this.getEntitiesByType(EntityCreature);

        for (i = 0; i < creature.length; i += 1) {
          creature[i].kill(false);
        }
      },

      nextLevel: function () {
        var data, n;

        this.level += 1;
        this.clearAll();
        this.spawnEntity(EntityExplosion, 0, 0, {
          fade: 0.01,
          rgb: "0,0,0",
        });
        this.spawnEntity(EntityExpandtext, 0, 0, {
          text: ig.TR.get("wave") + " " + this.level,
          textCol: "#fff",
        });

        data = this.levelData[this.level - 1];
        if (typeof data === "undefined") {
          data = this.levelData[this.levelData.length - 1];
        }
        this.currentLevel = data;
        this.currBG = data.bg || 0;

        this.availEntities = [];

        for (n in data.makeup) {
          // if (data.makeup.hasOwnPropery(n)) {
          for (i = 0; i < data.makeup[n]; i += 1) {
            this.availEntities.push(n);
          }
          // }
        }

        this.baddies += data.baddies;
        this.levelCount = 0; // num of baddies killed / escaped
        this.levelFinshed = false; // flag for calling next level
        this.timer.set(3);
      },
    });

    // ig.main( '#canvas', Splash, 60, 480, 288, 1 );
    // window.setTimeout(function() {
    //     ig.resize.init();
    //     ig.resize.scale();
    // }, 100);
  });
