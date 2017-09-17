import MovingObject from './moving_object';

class Laser extends MovingObject {
  constructor(paddle, xPos, game, ctx) {
    const options = {
      "pos": [
        xPos, paddle.yPos - 19
      ],
      "vel": [0, -5],
      "width": 5,
      "height": 19,
      "game": game,
    };
    super(options);
    this.image = new Image;
    this.image.src = "./assets/images/laser.png";
    this.ctx = ctx;
    this.image.onload = this.draw;
  }
}


const fireLasers = function(paddle, game, ctx) {
  const lasers = [];
  lasers.push(new Laser(paddle, paddle.xPos + 9, game, ctx));
  lasers.push(new Laser(paddle, paddle.xPos + paddle.width - 9, game, ctx));
  return lasers;
};

export default fireLasers;
