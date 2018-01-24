import Bird from './bird';

export default class Flock {

  constructor(count = 100, canvas, options = {}) {
    this.padding = options.padding || 0.5;
    this.count = count;
    this.birds = [];

    for (let i = 0; i < count; i++) {
      this.birds.push(new Bird(canvas, i, this));
    }
  }


  scan(bird, point) {
    const { x, y } = point;
    const conflicts = this.birds
      .filter(target => target !== bird && target.detectCollision(x, y));

    return conflicts;
  }
}