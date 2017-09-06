import Game from './lib/game';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  canvas.height = 600;
  canvas.width = 670;
  const ctx = canvas.getContext('2d');

  const game = new Game(ctx);
  const paddle = game.paddle;
  window.paddle = paddle;
  window.bricks = game.bricks;
  window.ctx = ctx;

  document.addEventListener("keydown", (event) => {
    switch(event.keyCode) {
      case 39:
        paddle.move(20);
        break;
      case 37:
        paddle.move(-20);
        break;
    }
  });
});
