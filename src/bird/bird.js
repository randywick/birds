/**
 * @module bird
 */

import Point from '../geometry/point';
import MersenneTwister from '../util/mersenne-twister';

export default class Bird {

  /**
   * Creates an instance of Bird.
   * @param {module:canvas} canvas 
   * @memberof Bird
   */
  constructor(canvas, id, flock) {
    this.length = 20;
    this.speed = 1;
    this.flock = flock;

    this.canvas = canvas;
    this.coords = canvas.getSpawnPoint();
    this.orientation = Math.random() * 360;
    this.targetOrientation = this.orientation;

    this.id = id || Date.now();
    this.rng = new MersenneTwister(this.id);

    this.render();
  }


  detectCollision(x, y) {
    const threshold = 0.7;

    return this.coords.x < x + (this.length * threshold)
      && this.coords.x > x - (this.length * threshold)
      && this.coords.y < y + (this.length * threshold)
      && this.coords.y > y - (this.length * threshold)
  }


  move() {
    let dy = 0;
    let dx = 0;

    this.rotate();

    if (this.targetOrientation !== this.orientation) {
      if (Math.abs(this.targetOrientation - this.orientation) < 1) {
        this.orientation = this.targetOrientation;
      }

      this.orientation += this.targetOrientation > this.orientation ? 1 : -1;
    }

    if (this.orientation < 90) {
      dy = (this.orientation / 90) * -1;
    } else if (this.orientation >= 270) {
      dy = ((360 - this.orientation) / 90) * -1;
    } else {
      dy = (270 - this.orientation) / 180;
    }

    if (this.orientation <= 180) {
      dx = this.orientation / 180;
    } else {
      dx = ((this.orientation - 180) / 180) * -1;
    }

    let newX = this.coords.x + dx * this.speed;
    let newY = this.coords.y + dy * this.speed;
    
    if (newY < 0) {
      newY = this.canvas.el.height;
    } else if (newY > this.canvas.el.height) {
      newY = 0;
    } else if (newX < 0) {
      newX = this.canvas.el.width;
    } else if (newX > this.canvas.el.width) {
      newX = 0;
    }

    const conflicts = this.flock.scan(this, { x: newX, y: newY })
    if (conflicts.length) {
      const leader = conflicts[0];

      this.orientation = leader.orientation;
      this.targetOrientation = leader.targetOrientation;
      // return this.move();
    }
    
    this.coords.x = newX;
    this.coords.y = newY;
    this.render();
  }


  rotate(degrees) {
    const rngChance = 0.5;
    if (degrees == null && this.orientation !== this.targetOrientation && this.rng.random() < rngChance) {
      const positiveOrNegative = this.rng.random() > 0.5 ? 1 : -1;

      degrees = this.rng.random() * 2 * positiveOrNegative;
    }
    
    if (degrees) {
      const target = this.orientation + degrees > 360
        ? this.orientation + degrees - 360
        : this.orientation + degrees;

      this.targetOrientation = target;
    }
  }


  // setSpeed(speed) {
  //   if (speed == null && Math.random() < 0.005) {
  //     const positiveOrNegative = Math.random() > 0.5 ? 1 : -1;
  //     const dSpeed = Math.random() * 2 * positiveOrNegative;
  //     speed = Math.max(this.speed + dSpeed, 1);
  //   }

  //   if (speed) {

  //   }
  // }


  render() {
    const ctx = this.canvas.el.getContext('2d');

          
    ctx.beginPath();
    ctx.moveTo(this.coords.x, this.coords.y);
    
    const bx = this.coords.x - (this.length * 0.5);
    const by = this.coords.y + (this.length * 0.5);
    ctx.lineTo(bx, by);

    const cx = this.coords.x + (this.length * 0.5);
    const cy = this.coords.y + (this.length * 0.5);
    ctx.lineTo(cx, by);

    ctx.lineTo(this.coords.x, this.coords.y);

    ctx.fill();
  }
  
}