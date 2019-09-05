require('./style.css')
import Game from './controller/Game.js';
const { GAME_WIDTH, GAME_HEIGHT } = require("./constants");
console.log(GAME_WIDTH, GAME_HEIGHT);

window.onload = () => {
  const canvas = document.getElementById('gameScreen');
  const ctx = canvas.getContext('2d');

  let lastTime = 0;
  const Gamer = new Game(GAME_WIDTH, GAME_HEIGHT);
  Gamer.init();

  function gameLoop() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    Gamer.update();
    Gamer.draw(ctx);
    window.lastTime =  requestAnimationFrame(gameLoop);
  }

  gameLoop();

}