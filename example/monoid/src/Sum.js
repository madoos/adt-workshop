const {
	construct
} = require('../../../src/util')

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
}

module.exports = construct(Sum)