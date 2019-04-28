class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  static create({
    x,
    y
  }) {
    return new Point(x, y)
  }

  // setoid
  equals(point) {
    return this.x === point.x && this.y === point.y
  }

  // Ord
  lte(point) {
    return this.x <= point.x && this.y <= point.y
  }
}

module.exports = Point