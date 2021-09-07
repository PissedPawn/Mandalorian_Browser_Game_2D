import Player from "./player.js";
import Bullet from "./bullet.js";
import Game from "./game.js";
import GameLoop from "./gameLoop.js";
import BulletManager from "./bulletManager.js";
import Enemy from "./enemy.js";
// CONSTANT ARRAYS
const keys = [];
const enemies = [];
const sprites = "/Sprites/";
// INSTANCES
let game = new Game("canvas1", 500, 500, sprites + "/bg.jpg");
let gameLoop = new GameLoop(30);
let player = new Player(sprites + "mandalorian2.png");
let enemy1 = new Enemy(sprites + "stormtrooper.png", 1, 0, 230);
let enemy2 = new Enemy(sprites + "enemy.png", 0.6, 500, 230);
let enemy3 = new Enemy(sprites + "sith.png", 2, 0, 500);
let enemy4 = new Enemy(sprites + "enemy.png", 0.3, 500, 235);
let enemy5 = new Enemy(sprites + "darthvader.png", 1, 500, 300);

let bulletManager = new BulletManager();
enemies.push(enemy1);
enemies.push(enemy2);
enemies.push(enemy3);
enemies.push(enemy4);
enemies.push(enemy5);

//GETTING INPUTS
game.getAllInputs(keys);
player.stopMove();

function shootBullet(event) {
  game.getMousePos(event);
  bulletManager.shootBullet(player, sprites+"laser.png");
}

document.addEventListener("click", shootBullet);
//PUTTING VALUES INSIDE VARIABLES SO IT IS EASIER TO CODE
const ctx = game.ctx;

let mouseX = game.mouseX;
let mouseY = game.mouseY;

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

      enemy.moveEnemy(player.x, player.y);
    });

    bulletManager.bullets.length !== 0
      ? bulletManager.bullets.forEach((bullet) => {
          if (bullet.delete === false) {
            bullet.moveBullet(game.mouseX, game.mouseY);
            bullet.draw(ctx);
          }
        })
      : console.log("empty");

    player.movePlayer(keys);

    //player.moveToMousePos(mouseX, mouseY);
  }
}

startAnimating(30);
