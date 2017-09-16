import Game from './lib/game';
import levels from './lib/levels';

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('board');
  canvas.height = 600;
  canvas.width = 700;
  const ctx = canvas.getContext('2d');
  let game = new Game(ctx);

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

  const muteButton = document.getElementById('mute-button');
  muteButton.addEventListener('click', () => {
    const audioEls = document.getElementsByTagName('audio');
    for (let i = 0; i < audioEls.length; i++) {
      audioEls[i].muted = !audioEls[i].muted;
    }

    if (muteButton.textContent === 'Mute Sounds') {
      muteButton.textContent = 'Unmute Sounds';
    } else {
      muteButton.textContent = 'Mute Sounds';
    }
  });
});
