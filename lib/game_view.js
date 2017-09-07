class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.movePaddle = this.movePaddle.bind(this);
  }

  start() {
    document.addEventListener("keydown", this.movePaddle);
    setInterval(this.game.step, 20);
  }

  movePaddle(e) {
    if (e.code === 'ArrowRight') {
      this.game.paddle.xVel = Math.abs(this.game.paddle.xVel);
      this.game.paddle.move();
    } else if (e.code === 'ArrowLeft') {
      this.game.paddle.xVel = -Math.abs(this.game.paddle.xVel);
      this.game.paddle.move();
    }
  }

}

export default GameView;
