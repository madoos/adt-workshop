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
		this._f = f
	}

	static empty() {
		return new Compose(identity)
	}

	concat(compose) {
		return new Compose(x => this._f(compose._f(x)))
	}

	// -- utils
	toString() {
		return `Compose(${this._f})`
	}

	[inspect.custom]() {
		return this.toString()
	}
}

module.exports = construct(Compose)