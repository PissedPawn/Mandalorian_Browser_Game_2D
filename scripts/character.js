import Vector2 from "./vector2.js";

export default class Character {
  constructor(image) {
    (this.pos = new Vector2(300, 150)),
      (this.width = 32),
      (this.height = 48),
      (this.frameX = 0),
      (this.frameY = 0),
      (this.speed = 10),
      (this.moving = false),
      (this.characterSprite = new Image()),
      (this.characterSprite.src = image);
  }

  handleCharacterFrame() {
    if (this.frameX < 3 && this.moving) this.frameX++;
    else this.frameX = 0;
  }

  draw(ctx) {
    ctx.drawImage(
      this.characterSprite,
      this.width * this.frameX,
      this.height * this.frameY,
      this.width,
      this.height,
      this.pos.x,
      this.pos.y,
      this.width,
      this.height
    );
  }

  jump() {
    //to be made
  }
}
