class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.lastTime = null;
    this.movePaddle = this.movePaddle.bind(this);
    this.stopPaddle = this.stopPaddle.bind(this);
    this.animate = this.animate.bind(this);
  }

  start() {
    document.addEventListener("keydown", this.movePaddle);
    document.addEventListener("keyup", this.stopPaddle);
    requestAnimationFrame(this.animate);
  }

  movePaddle(e) {
    if (e.code === 'ArrowRight') {
      this.game.paddle.xVel = 10;
    } else if (e.code === 'ArrowLeft') {
      this.game.paddle.xVel = -10;
    }
  }

  stopPaddle(e) {
    if (e.code === 'ArrowRight' || e.code === 'ArrowLeft') {
      this.game.paddle.xVel = 0;
    }
  }

  animate(currentTime) {
    if (!this.lastTime) this.lastTime = currentTime;
    const delta = currentTime - this.lastTime;
    requestAnimationFrame(this.animate);
    this.game.step(delta);
    this.game.draw();
    this.lastTime = currentTime;
  }
}

export default GameView;
