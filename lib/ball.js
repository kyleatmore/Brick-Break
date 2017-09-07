import MovingObject from './moving_object';

class Ball extends MovingObject {
  constructor(options, ctx) {
    super(options);
    this.image = new Image;
    this.image.src = "../assets/ball.png";
    this.ctx = ctx;
    this.image.onload = this.draw;
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

}

export default Ball;
