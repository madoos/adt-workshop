const {
	construct
} = require('../util')

class Point {
	constructor(x, y) {
		this.x = x
		this.y = y
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

module.exports = construct(Point)