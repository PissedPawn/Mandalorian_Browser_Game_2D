export default class Game {
  constructor(canvasId, width, height, image) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = width;
    this.width = this.canvas.width;
    this.canvas.height = height;
    this.height = this.canvas.height;
    this.screenW = window.innerWidth;
    this.screenH = window.innerHeight;
    (this.mouseX = 0), (this.mouseY = 0);
    this.background = new Image();
    this.background.src = image;
    // (this.fps = 0),
    //   (this.fpsInterval = 0),
    //   (this.startTime = 0),
    //   (this.now = 0),
    //   (this.then = 0),
    //   (this.elapsed = 0);
  }

  getMousePos() {
    var that = this;
    document.addEventListener("click", function (event) {
      that.mouseX = event.clientX - (that.screenW - that.width) / 2;
      that.mouseY = event.clientY - (that.screenH - that.height) / 2;
    });
  }
  drawGameScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(
      this.background,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  getKeyDown(keys) {
    window.addEventListener("keydown", function (e) {
      keys[e.key] = true;
    });
  }

  getKeyUp(keys) {
    let that = this;
    window.addEventListener("keyup", function (e) {
      delete keys[e.key];
    });
  }

  getAllInputs(keys) {
    this.getKeyDown(keys);
    this.getKeyUp(keys);
    this.getMousePos();
  }

  //   startAnimating(fps) {
  //     this.fpsInterval = 1000 / fps;
  //     this.then = Date.now();
  //     this.startTime = this.then;
  //     this.animate();
  //   }

  //   animate() {
  //     requestAnimationFrame(this.animate);
  //     this.now = Date.now();
  //     this.elapsed = this.now - this.then;

  //     if (this.elapsed > this.fpsInterval) {
  //       this.then = this.now - (this.elapsed % this.fpsInterval);
  //       this.drawGameScreen();
  //       player.draw(ctx);
  //       bullets.forEach((bullet) => {
  //         if (bullet.delete === false) {
  //           bullet.moveBullet(mouseX, mouseY);
  //           bullet.draw(ctx);
  //         }
  //       });

  //       player.movePlayer(keys);
  //       //player.moveToMousePos(mouseX, mouseY);
  //       player.handlePlayerFrame();
  //     }
  //   }
}
