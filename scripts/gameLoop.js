export default class GameLoop {
  constructor(fps) {
    (this.fps = fps),
      (this.fpsInterval = 0),
      (this.now = 0),
      (this.then = 0),
      (this.elapsed = 0);
  }

  startAnimating(func) {
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();

    this.animate(func);
  }

  animate(func) {
    requestAnimationFrame((func) => this.animate(func));
    this.now = Date.now();

    this.elapsed = this.now - this.then;

    if (this.elapsed > this.fpsInterval) {
      this.then = this.now - (this.elapsed % this.fpsInterval);
   
    }
  }
}
