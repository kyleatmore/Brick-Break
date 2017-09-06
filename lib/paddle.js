class Paddle {
  constructor(ctx) {
    this.ctx = ctx;
    this.xPos = 10;
    this.yPos = 525;
    this.image = new Image;
    this.image.src = "../assets/breakout_pieces.png";
    this.move = this.move.bind(this);
    this.render = this.render.bind(this);
    this.clear = this.clear.bind(this);

    this.image.onload = () => {
      this.render();
    };
  }

  move(dx) {
    this.xPos += dx;
    this.clear();
    this.render();
  }

  render() {
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.xPos, this.yPos, 90, 35);
    this.ctx.drawImage(this.image, 0, 145, 72, 28, this.xPos, this.yPos, 90, 35);
  }

  clear() {
    this.ctx.clearRect(10, 525, 670, 35);
  }
}

export default Paddle;
