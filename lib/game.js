import Brick from './brick';
import Paddle from './paddle';
import Ball from './ball';
import GameView from './game_view';

class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.bricks = [];
    this.colors = ['teal', 'red', 'yellow', 'blue', 'green'];
    this.gameView = new GameView(this, ctx);
    this.addBall();
    this.addPaddle();
    this.populateBricks();
    this.step = this.step.bind(this);
  }

  addBall() {
    const ballOptions = {
      "pos": [300, 300],
      "vel": [3, 3],
      "width": 19,
      "height": 19,
    };
    this.ball = new Ball(ballOptions, this.ctx);
  }

  addPaddle() {
    const paddleOptions = {
      "pos": [10, 525],
      "vel": [0, 0],
      "width": 100,
      "height": 19,
    };
    this.paddle = new Paddle(paddleOptions, this.ctx);
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
    this.paddle.draw();
  }

  moveBall() {
    this.ball.clear();
    this.ball.bounce();
    this.ball.move();
    this.ball.draw();
  }

  checkCollisions() {
    this.bricks.forEach((brick) => {
      if (this.ball.isCollidedWith(brick)) {
        this.removeBrick(brick);
      }
    });
  }

  step() {
    this.moveBall();
    this.checkCollisions();
  }

  removeBrick(brick) {
    brick.destroy();
    const index = this.bricks.indexOf(brick);
    this.bricks.splice(index, 1);
  }

}

export default Game;
