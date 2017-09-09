import Game from './lib/game';
import Brick from './lib/brick';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  canvas.height = 600;
  canvas.width = 700;
  const ctx = canvas.getContext('2d');
  const game = new Game(ctx);
  //
  // game.gameView.start();

  window.game = game;
  window.paddle = game.paddle;
  window.bricks = game.bricks;
  window.ctx = ctx;
  window.ball = game.ball;


  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', () => {
    game.start();
  });
});
