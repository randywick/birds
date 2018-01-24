import Bird from './bird/bird';
import Flock from './bird/flock';
import Canvas from './canvas/canvas';
import Game from './game/game';

const el = document.querySelector('#canvas');
const canvas = new Canvas(el);

const flock = new Flock(300, canvas);

const game = new Game();

game.on('tick', () => {
  canvas.clear();
  flock.birds.forEach(bird => bird.move());
});

// setTimeout(() => game.pause(), 5000);

game.play();