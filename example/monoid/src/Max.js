const {
	construct
} = require('../../../src/util')

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
}

module.exports = construct(Max)