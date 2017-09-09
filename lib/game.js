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
    this.start = this.start.bind(this);
  }

  allObjects() {
    const objects = this.bricks.concat(this.paddle, this.ball);
    return objects;
  }

  addBall() {
    const ballOptions = {
      "pos": [100, 300],
      "vel": [0, -5],
      "width": 19,
      "height": 19,
      "game": this,
    };
    this.ball = new Ball(ballOptions, this.ctx);
  }

  addPaddle() {
    const paddleOptions = {
      "pos": [10, 525],
      "vel": [0, 0],
      "width": 100,
      "height": 19,
      "game": this,
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
        xPos += 50;
      }

      yPos += 25;
      xPos = 25;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, 700, 600);
    this.allObjects().forEach((object) => object.draw());
  }

  moveBall(timeDelta) {
    this.ball.bounce();
    this.ball.move(timeDelta);
    this.paddle.move(timeDelta);
    debugger
  }

  checkCollisions() {
    const gameObjects = this.allObjects();

    for (let i = 0; i < gameObjects.length - 1; i++) {
      const gameObject = gameObjects[i];
      if (this.ball.isCollidedWith(gameObject)) {

        if (gameObject instanceof Brick) {
          this.ball.collideWith(gameObject);
          this.removeBrick(gameObject);
        } else {
          this.ball.collideWithPaddle(gameObject);
        }

        break;
      }
    }
  }

  step(timeDelta) {
    debugger
    this.moveBall(timeDelta);
    this.checkCollisions();
  }

  removeBrick(brick) {
    brick.destroy();
    const index = this.bricks.indexOf(brick);
    this.bricks.splice(index, 1);
  }

  isOutOfBounds(gameObject) {
    if ((gameObject.yPos + gameObject.height) >= 600) {
      return true;
    }

    return false;
  }

  lost() {

  }

  won() {
    return this.bricks.length === 0;
  }

  start() {
    this.gameView.start();
  }

}

export default Game;
