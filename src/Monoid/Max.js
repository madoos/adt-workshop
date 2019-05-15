const {
	inspect
} = require('util')

const {
	construct
} = require('../util')

class Max {
	constructor(n) {
		this._value = n
	}

	static empty() {
		return new Max(-Infinity)
	}

	concat(max) {
		return new Max(
			this._value > max._value ? this._value : max._value
		)
	}

	// -- utils
	toString() {
		return `Max(${this._value})`
	}

	[inspect.custom]() {
		return this.toString()
	}
}

module.exports = construct(Max)