class Brick {
  constructor(xPos, yPos, hitsToDestroy, color, ctx) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.hitsToDestroy = hitsToDestroy;
    this.color = color;
    this.ctx = ctx;
    this.width = 50;
    this.height = 25;
    this.image = new Image(this.width, this.height);
    this.image.src = `../assets/${this.color}_brick.png`;
    this.draw = this.draw.bind(this);
    this.destroy = this.destroy.bind(this);
    this.image.onload = this.draw;
    this.destroySound = new Audio;
    this.destroySound.src = "../assets/sounds/brick_break.wav";
  }

  takeHit() {
    if (this.hitsToDestroy === 1) {
      this.destroy();
    } else {
      this.hitsToDestroy -= 1;
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
    this.destroySound.play();
  }
}

export default Brick;
