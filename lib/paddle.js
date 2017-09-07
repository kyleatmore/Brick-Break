class Paddle {
  constructor(xPos, yPos, ctx) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.ctx = ctx;
    this.width = 100;
    this.height = 19;
    this.image = new Image(this.width, this.height);
    this.image.src = "../assets/paddle.png";
    this.move = this.move.bind(this);
    this.renderRectangle = this.renderRectangle.bind(this);
    this.render = this.render.bind(this);
    this.clear = this.clear.bind(this);
    this.image.onload = this.render;
  }

  move(dx) {
    this.clear();
    this.xPos += dx;
    this.render();
  }

  renderRectangle() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(
      this.xPos,
      this.yPos,
      this.width,
      this.height
    );
  }

  render() {
    this.renderRectangle();
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

export default Paddle;
