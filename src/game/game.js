import EventEmitter from '../util/event-emitter';

export default class Game extends EventEmitter {

  constructor() {
    super();

    this.tickRate = 60;
  }

  tick() {
    if (this.isPaused) {
      return;
    }

    this.emit('tick');

    const interval = 1000 / this.tickRate;
    setTimeout(() => this.tick(), interval);
  }

  pause() {
    this.isPaused = true;
  }

  play() {
    this.isPaused = false;
    this.tick();
  }
}