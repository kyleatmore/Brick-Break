class Paddle {
  constructor(ctx) {
    this.ctx = ctx;
    this.xPos = 10;
    this.yPos = 525;
    this.image = new Image;
    this.image.src = "../assets/breakout_pieces.png";
  }

  move(dx) {
    this.xPos += dx;
    this.clear();
    this.render();
  }

  render() {
    this.image.onload = () => {
      this.ctx.drawImage(this.image, 0, 145, 72, 28, this.xPos, this.yPos, 90, 35);
    };
  }

  clear() {
    this.ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
  }
}

export default Paddle;
