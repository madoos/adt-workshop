const {
	inspect
} = require('util')

const {
	construct
} = require('../util')

const {
	add
} = require('ramda')

class Sum {
	constructor(n) {
		this._value = n
	}

	static empty() {
		return new Sum(0)
	}

	concat(sum) {
		return new Sum(
			add(this._value, sum._value)
		)
	}

	// -- utils
	toString() {
		return `Sum(${this._value})`
	}

	[inspect.custom]() {
		return this.toString()
	}
}

module.exports = construct(Sum)