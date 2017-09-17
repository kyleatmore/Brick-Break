import Brick from './brick';
import Paddle from './paddle';
import Ball from './ball';
import GameView from './game_view';
import levels from './levels';
import randomPowerup from './powerup';


class Game {
  constructor(ctx) {
    this.ctx = ctx;
    this.balls = [];
    this.bricks = [];
    this.powerups = [];
    this.lasers = [];
    this.score = 0;
    this.lives = 99;
    this.level = 1;
    this.impactSound = new Audio;
    this.destroySound = new Audio;
    this.gameView = new GameView(this, ctx);
    this.step = this.step.bind(this);
    this.start = this.start.bind(this);
    this.setupGame();
  }

  setupGame() {
    this.addPaddle();
    this.addBall();
    this.populateBricks();
    this.setScoreAndLives();
    this.setupSounds();
  }

  allObjects() {
    const objects = this.bricks.concat(this.paddle, this.balls);
    return objects;
  }

  addBall(initYVel = 2) {
    const ballOptions = {
      "pos": [this.paddle.xPos + this.paddle.width / 2, 420],
      "vel": [0, initYVel],
      "width": 19,
      "height": 19,
      "game": this,
    };
    this.balls.push(new Ball(ballOptions, this.ctx));
  }

  addPaddle() {
    const paddleOptions = {
      "pos": [30, 525],
      "vel": [0, 0],
      "width": 100,
      "height": 19,
      "game": this,
    };
    this.paddle = new Paddle(paddleOptions, this.ctx);
  }

  populateBricks() {
    this.bricks = levels[this.level](this.ctx);
  }

  setScoreAndLives() {
    const scoreCounter = document.getElementById('score');
    scoreCounter.textContent = this.score;
    const livesElement = document.getElementById('lives');
    livesElement.textContent = `x${this.lives}`;
  }

  setupSounds() {
    this.impactSound.src = "./assets/sounds/paddle_impact.wav";
    this.destroySound.src = "./assets/sounds/brick_break.wav";
    document.body.append(this.impactSound);
    document.body.append(this.destroySound);
  }

  draw() {
    this.ctx.clearRect(0, 0, 700, 600);
    this.allObjects().forEach((object) => object.draw());
    this.powerups.forEach((powerup) => powerup.draw());
    this.lasers.forEach((laser) => laser.draw());
  }

  moveObjects(timeDelta) {
    this.balls.forEach((ball) => ball.move(timeDelta));
    this.paddle.move(timeDelta);
    this.powerups.forEach((powerup) => powerup.move(timeDelta));
    this.lasers.forEach((laser) => laser.move(timeDelta));
  }

  checkBallCollisions(ball) {
    const gameObjects = this.allObjects();

    for (let i = 0; i < gameObjects.length; i++) {
      const gameObject = gameObjects[i];
      if (gameObject instanceof Ball) continue;

      if (ball.isCollidedWith(gameObject)) {
        if (gameObject instanceof Brick) {
          ball.collideWith(gameObject);
          this.removeBrick(gameObject);
        } else if (gameObject instanceof Paddle){
          ball.collideWithPaddle(gameObject);
          this.impactSound.play();
        }

        break;
      }
    }
  }

  checkPowerupCollisions() {
    for (let i = 0; i < this.powerups.length; i++) {
      const powerup = this.powerups[i];

      if (this.isOutOfBounds(powerup)) this.powerups.splice(i, 1);

      if (powerup.isCollidedWith(this.paddle)) {
        powerup.activate();
        this.powerups.splice(i, 1);
      }
    }
  }

  checkLaserCollisions(laser, idx) {
    if (this.isOutOfBounds(laser)) {
      this.lasers.splice(idx, 1);
      return;
    }

    for (let i = 0; i < this.bricks.length; i++) {
      const brick = this.bricks[i];

      if (laser.isCollidedWith(brick)) {
        this.removeBrick(brick);
        this.lasers.splice(idx, 1);
      }
    }
  }

  step(timeDelta) {
    this.moveObjects(timeDelta);
    this.balls.forEach((ball) => this.checkBallCollisions(ball));
    this.checkPowerupCollisions();
    this.lasers.forEach((laser, i) => this.checkLaserCollisions(laser, i));

    if (this.allBallsOutOfBounds() && this.lives > 0) {
      this.respawnBall();
    }

    this.draw();
  }

  respawnBall() {
    this.balls = [];
    this.addBall();
    this.lives -= 1;
    const livesElement = document.getElementById('lives');
    livesElement.textContent = `x${this.lives}`;
  }

  removeBrick(brick) {
    this.destroySound.play();
    if (brick.takeHit()) {
      const index = this.bricks.indexOf(brick);
      this.bricks.splice(index, 1);
      this.updateScore();
      if (Math.random() < 0.25) this.spawnPowerup(brick);
    }
  }

  isOutOfBounds(gameObject) {
    if (gameObject.yPos >= 600 || gameObject.yPos < 0) {
      return true;
    }

    return false;
  }

  allBallsOutOfBounds() {
    for (let i = 0; i < this.balls.length; i++) {
      if (!this.isOutOfBounds(this.balls[i])) return false;
    }
    return true;
  }

  updateScore() {
    this.score += 80;
    const scoreCounter = document.getElementById('score');
    scoreCounter.textContent = this.score;
  }

  spawnPowerup(brick) {
    this.powerups.push(randomPowerup(brick, this, this.ctx));
  }

  expandPaddle() {
    this.paddle.expand();
  }

  slowBall() {
    this.balls.forEach((ball) => ball.slow());
  }

  addTwoBalls() {
    this.addBall(2);
    this.addBall(3);
  }

  addLife() {
    this.lives += 1;
    const livesElement = document.getElementById('lives');
    livesElement.textContent = `x${this.lives}`;
  }

  addLaser(lasers) {
    if (this.lasers.length === 0) {
      this.lasers = this.lasers.concat(lasers);
    }
  }

  laserPaddle() {
    this.paddle.enterLaserMode();
  }

  nextLevel() {
    this.level += 1;
    this.balls = [];
    this.powerups = [];
    this.populateBricks();
    this.addBall();
  }

  lost() {
    if (this.lives > 0) return false;
    for (let i = 0; i < this.balls.length; i++) {
      if (!this.isOutOfBounds(this.balls[i])) return false;
    }
    return true;
  }

  won() {
    if (this.bricks.length !== 0) return false;
    if (this.level < 4) {
      this.nextLevel();
      return false;
    }
    return true;
  }

  over() {
    return this.lost() || this.won();
  }

  start() {
    this.gameView.start();
  }

}

export default Game;
