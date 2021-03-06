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
    (this.mouseX = 0), (this.mouseY =0);
    this.background = new Image();
    this.background.src = image;
  }

  getMousePos(event) {
    this.mouseX = event.clientX - (this.screenW - this.width) / 2;
    this.mouseY = event.clientY - (this.screenH - this.height) / 2;
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
    window.addEventListener("keyup", function (e) {
      delete keys[e.key];
    });
  }

  getAllInputs(keys) {
    this.getKeyDown(keys);
    this.getKeyUp(keys);
  }
}
