const {
	inspect
} = require('util')

const {
	construct
} = require('../util')

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

	// -- utils
	toString() {
		return `Compose(${this._value})`
	}

	[inspect.custom]() {
		return this.toString()
	}
}

module.exports = construct(Compose)