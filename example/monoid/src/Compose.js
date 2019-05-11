const {
	construct
} = require('../../../src/util')

const {
	identity
} = require('ramda')

class Compose {
	constructor(f) {
		this._value = f
	}

	static empty() {
		return new Compose(identity)
	}

	concat(compose) {
		return new Compose(x => this._value(compose._value(x)))
	}
}

module.exports = construct(Compose)