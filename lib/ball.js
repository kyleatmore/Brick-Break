class Ball {
  constructor(xPos, yPos, ctx) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.ctx = ctx;
    this.width = 19;
    this.height = 19;
    this.image = new Image(this.width, this.height);
    this.image.src = "../assets/ball.png";
    this.move = this.move.bind(this);
    this.render = this.render.bind(this);
    this.clear = this.clear.bind(this);
    this.image.onload = this.render;
  }

  move() {
    this.clear();

    if (Math.random() <= 0.5) {
      this.xPos += 10;
      this.yPos += 10;
    } else {
      this.xPos -= 10;
      this.yPos -= 10;
    }

    this.render();
  }

  render() {
    this.ctx.drawImage(
      this.image,
      this.xPos,
      this.yPos,
      this.width,
      this.height
    );
  }

  clear() {
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
  }


}

export default Ball;
