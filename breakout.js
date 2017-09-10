import Game from './lib/game';
import Brick from './lib/brick';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  canvas.height = 600;
  canvas.width = 700;
  const ctx = canvas.getContext('2d');
  let game = new Game(ctx);

  window.game = game;
  window.paddle = game.paddle;
  window.bricks = game.bricks;
  window.ctx = ctx;
  window.ball = game.ball;


  const startButton = document.getElementById('start-button');
  startButton.addEventListener('click', () => {
    game.start();
    const startModal = document.getElementsByClassName('start-game')[0];
    startModal.className = " hidden";
  });

  const playAgainButton = document.getElementById('play-again button');
  playAgainButton.addEventListener('click', () => {
    game = new Game(ctx);
    game.start();
    const playAgainModal = document.getElementsByClassName('play-again')[0];
    playAgainModal.className += " hidden";
  });
});
