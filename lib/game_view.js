class GameView {
  constructor(game, ctx) {
    this.game = game;
    this.ctx = ctx;
    this.lastTime = 0;
    this.movePaddle = this.movePaddle.bind(this);
    this.animate = this.animate.bind(this);
  }

  start() {
    document.addEventListener("keydown", this.movePaddle);
    requestAnimationFrame(this.animate);
  }

  movePaddle(e) {
    if (e.code === 'ArrowRight') {
      this.game.paddle.xPos += 20;
    } else if (e.code === 'ArrowLeft') {
      this.game.paddle.xPos -= 20;
    }
  }

  animate(currentTime) {
    const delta = currentTime - this.lastTime;
    requestAnimationFrame(this.animate);
    this.game.step(delta);
    this.game.draw();
    this.lastTime = currentTime;
  }
}

export default GameView;
