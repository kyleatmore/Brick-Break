class Brick {
  constructor(xPos, yPos, hitsToDestroy, color) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.hitsToDestroy = hitsToDestroy;
    this.color = color;
    this.width = 50;
    this.height = 15;
  }

  takeHit() {
    if (this.hitsToDestroy === 1) {
      this.remove();
    } else {
      this.hitsToDestroy -= 1;
    }
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.xPos, this.yPos, this.width, this.height);
  }

  remove(ctx) {
    ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
  }
}

export default Brick;
