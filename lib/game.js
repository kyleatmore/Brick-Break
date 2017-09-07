import Brick from './brick';
import Paddle from './paddle';
import Ball from './ball';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bricks = [];
    this.colors = ['teal', 'red', 'yellow', 'blue', 'green'];
    this.paddle = new Paddle(10, 525, ctx);
    this.addBall();
    this.populateBricks();
    this.paddle.render();
    // this.ball.draw(ctx);
  }

  addBall() {
    const ballOptions = {
      "pos": [300, 300],
      "vel": [0, 0],
      "width": 19,
      "height": 19,
    };
    this.ball = new Ball(ballOptions, this.ctx);
  }

  populateBricks() {
    let xPos = 25;
    let yPos = 50;

    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 13; col++) {
        const brick = new Brick(xPos, yPos, 1, this.colors[row], this.ctx);
        this.bricks.push(brick);
        brick.render();
        xPos += 50;
      }

      yPos += 25;
      xPos = 25;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, 700, 600);
    this.ball.draw();
  }
}

export default Game;
