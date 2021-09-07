export default class Character
{
    constructor(image) {
        (this.x = 300),
          (this.y = 150),
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