import MovingObject from './moving_object';

class Powerup extends MovingObject {
  constructor(brick, game, ctx) {
    const options = {
      "pos": [
        brick.xPos + brick.width / 2, brick.yPos + brick.height / 2
      ],
      "vel": [0, 2],
      "width": 15,
      "height": 15,
      "game": game,
    };
    super(options);
    this.image = new Image;
    this.image.src = "./assets/images/expand_powerup.png";
    this.ctx = ctx;
    this.image.onload = this.draw;
  }

  collideWithPaddle(paddle) {
    this.clear();
    this.activate();
  }

  activate() {
    this.game.expandPaddle();
  }
}

export default Powerup;
