export default class Player {
  constructor(image) {
    (this.x = 300),
      (this.y = 300),
      (this.width = 32),
      (this.height = 48),
      (this.frameX = 0),
      (this.frameY = 0),
      (this.speed = 10),
      (this.moving = false),
      (this.playerSprite = new Image()),
      (this.playerSprite.src = image);
  }

  movePlayer(keys) {
    if ((keys["ArrowUp"] || keys["w"]) && this.y > 150) {
      this.y -= this.speed;
      this.frameY = 3;
      this.moving = true;
    }
    if ((keys["ArrowDown"] || keys["s"]) && this.y < 448) {
      this.y += this.speed;
      this.frameY = 0;
      this.moving = true;
    }

    if ((keys["ArrowLeft"] || keys["a"]) && this.x > 12) {
      this.x -= this.speed;
      this.frameY = 1;
      this.moving = true;
    }

    if ((keys["ArrowRight"] || keys["d"]) && this.x < 448) {
      this.x += this.speed;
      this.frameY = 2;
      this.moving = true;
    }
  }

  stopMove() {
    let that = this;
    document.addEventListener("keyup", function (e) {
      that.moving = false;
    });
  }

  moveToMousePos(mouseX, mouseY) {
    if (this.moving) {
      if (
        this.x <= mouseX + 10 &&
        this.x > mouseX - 10 &&
        this.y <= mouseY + 10 &&
        this.y > mouseY - 10
      ) {
        this.moving = false;
      }
      if (this.x > mouseX) {
        this.x -= this.speed;
      }

      if (
        Math.abs(this.x - mouseX) > Math.abs(this.y - mouseY) &&
        this.x > mouseX
      ) {
        this.frameY = 1;
      }

      if (
        Math.abs(this.x - mouseX) > Math.abs(this.y - mouseY) &&
        this.x < mouseX
      ) {
        this.frameY = 2;
      }

      if (
        Math.abs(this.x - mouseX) < Math.abs(this.y - mouseY) &&
        this.y < mouseY
      ) {
        this.frameY = 0;
      }

      if (
        Math.abs(this.x - mouseX) < Math.abs(this.y - mouseY) &&
        this.y > mouseY
      ) {
        this.frameY = 3;
      }

      if (this.x < mouseX) {
        this.x += this.speed;
      }

      if (this.y > mouseY) {
        this.y -= this.speed;
      }

      if (this.y < mouseY) {
        this.y += this.speed;
      }
    }
  }

  handlePlayerFrame() {
    if (this.frameX < 3 && this.moving) this.frameX++;
    else this.frameX = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      this.playerSprite,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  jump() {
    //to be made
  }
}
