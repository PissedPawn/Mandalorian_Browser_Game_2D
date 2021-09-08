import Player from "./player.js";
import Bullet from "./bullet.js";
import Game from "./game.js";
import GameLoop from "./gameLoop.js";
import BulletManager from "./bulletManager.js";
import Enemy from "./enemy.js";
import Vector2 from "./vector2.js";

//#region Constants
const keys = [];
const enemies = [];
const sprites = "/Sprites/";
//#endregion

//#region INSTANCES
let game = new Game("canvas1", 500, 500, sprites + "/bg.jpg");

let player = new Player(sprites + "mandalorian2.png", new Vector2(300, 150));
let enemy1 = new Enemy(sprites + "stormtrooper.png", 1, new Vector2(500, 200));
let enemy2 = new Enemy(sprites + "enemy.png", 0.6, new Vector2(500, 230));
let enemy3 = new Enemy(sprites + "sith.png", 2, new Vector2(0, 500));
let enemy4 = new Enemy(sprites + "enemy.png", 0.8, new Vector2(500, 230));

let bulletManager = new BulletManager();
//#endregion

// enemies.push(enemy1);
// enemies.push(enemy2);
// enemies.push(enemy3);
enemies.push(enemy4);

//GETTING INPUTS
game.getAllInputs(keys);
player.stopMove();

function shootBullet(event) {
  game.getMousePos(event);
  bulletManager.shootBullet(player, sprites + "laser.png");
}

document.addEventListener("click", shootBullet);
//PUTTING VALUES INSIDE VARIABLES SO IT IS EASIER TO CODE
const ctx = game.ctx;

let fpsInterval, startTime, now, then, elapsed;

//gameLoop.startAnimating(game.drawGameScreen());

//FPS LOOP

function startAnimating(fps) {
  fpsInterval = 1000 / fps;
  then = Date.now();
  startTime = then;
  animate();
}

function animate() {
  requestAnimationFrame(animate);
  now = Date.now();
  elapsed = now - then;

  if (elapsed > fpsInterval) {
    then = now - (elapsed % fpsInterval);
    game.drawGameScreen();
    player.draw(ctx);
    enemies.forEach((enemy) => {
      enemy.draw(ctx);

      enemy.moveEnemy(player.pos.x, player.pos.y);
    });

    bulletManager.bullets.length !== 0
      ? bulletManager.bullets.forEach((bullet) => {
          if (bullet.delete === false) {
            bullet.moveBullet(game.mouseX, game.mouseY);
            bullet.draw(ctx);
          }
        })
      : null;

    player.movePlayer(keys);
  }
}

startAnimating(30);
