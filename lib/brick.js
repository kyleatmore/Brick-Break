class Brick {
  constructor(xPos, yPos, color, ctx) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.color = color;
    this.ctx = ctx;
    this.width = 50;
    this.height = 25;
    this.hitsToDestroy = this.color === 'teal' ? 2 : 1;
    this.image = new Image(this.width, this.height);
    this.image.src = `./assets/images/${this.color}_brick.png`;
    this.draw = this.draw.bind(this);
    this.destroy = this.destroy.bind(this);
    this.image.onload = this.draw;
  }

  takeHit() {
    if (this.hitsToDestroy === 1) {
      this.destroy();
      return true;
    } else {
      this.hitsToDestroy -= 1;
      return false;
    }
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.xPos,
      this.yPos,
      this.width,
      this.height
    );
  }

  destroy() {
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
  }
}

export default Brick;
