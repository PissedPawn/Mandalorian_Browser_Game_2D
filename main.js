import Player from "./player.js";
import Bullet from "./bullet.js";
import Game from "./game.js";
import GameLoop from "./gameLoop.js";
import BulletManager from "./bulletManager.js";
// CONSTANT ARRAYS
const keys = [];
// INSTANCES
let game = new Game("canvas1", 500, 500, "bg.jpg");
let gameLoop = new GameLoop(30);
let player = new Player("mandalorian2.png");
let bulletManager = new BulletManager();

//GETTING INPUTS
game.getAllInputs(keys);
player.stopMove();

function shootBullet(event) {
  game.getMousePos(event);
  bulletManager.shootBullet(player, "laser.png");
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
    player.handlePlayerFrame();
  }
}

startAnimating(30);
