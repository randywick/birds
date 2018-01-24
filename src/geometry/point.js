/**
 * Point module.
 * @module geometry/point
 */

/**
 * Class representing a 2D point
 * 
 * @export
 * @class Point
 */
export default class Point {

  /**
   * Creates an instance of Point.
   * @param {number} x 
   * @param {number} y 
   * @memberof Point
   */
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

}