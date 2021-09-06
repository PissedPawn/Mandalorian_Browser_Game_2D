import Player from "./Player.js";
import Bullet from "./Bullet.js";
import Game from "./game.js";
import GameLoop from "./gameLoop.js";
// CONSTANT ARRAYS
const bullets = [];
const keys = [];
// INSTANCES
let game = new Game("canvas1", 500, 500, "bg.jpg");
let gameLoop = new GameLoop(30);
let player = new Player("mandalorian2.png");

//GETTING INPUTS
game.getAllInputs(keys);
player.stopMove();

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
    bullets.forEach((bullet) => {
      if (bullet.delete === false) {
        bullet.moveBullet(mouseX, mouseY);
        bullet.draw(ctx);
      }
    });

    player.movePlayer(keys);
    //player.moveToMousePos(mouseX, mouseY);
    player.handlePlayerFrame();
  }
}

startAnimating(30);
