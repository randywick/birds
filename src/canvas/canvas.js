/**
 * @module canvas
 */

import Point from '../geometry/point';

/**
 * Canvas html element wrapper class
 * 
 * @export
 * @class Canvas
 */
export default class Canvas {

  constructor(el) {
    this.el = el;
  }

  clear() {
    const ctx = this.el.getContext('2d');
    ctx.clearRect(0, 0, this.el.width, this.el.height);
    ctx.save();
    
    return true;
  }

  /**
   * 
   * 
   * @returns Point
   * @memberof Canvas
   */
  getSpawnPoint() {
    const x = Math.floor(Math.random() * this.el.width);
    const y = Math.floor(Math.random() * this.el.height);

    return new Point(x, y);
  }

}