const {
	inspect
} = require('util')

const {
	construct
} = require('./util')

const {
	isNil
} = require('ramda')

class Maybe {
	constructor(value) {
		this._value = value
	}

	static Nothing() {
		return new Maybe()
	}

	static Just(value) {
		return new Maybe(value)
	}

	// -- Pointed
	static of (value) {
		return new Maybe(value)
	}

	// --Functor
	map(f) {
		return this.isNothing() ? this : new Maybe(f(this._value))
	}

	// --Monad
	chain(f) {
		return this.map(f).join()
	}

	join() {
		return this.isNothing() ? this : this._value
	}

	// -- applicative
	ap(maybe) {
		return this.isNothing() ? this : this.chain(val => maybe.map(f => f(val)))
	}

	// -- utils
	isNothing() {
		return isNil(this._value)
	}

	toString() {
		return this.isNothing() ? `Nothing()` : `Just(${this._value})`
	}

	[inspect.custom]() {
		return this.toString()
	}

	fold(f, g) {
		return this.isNothing() ? f() : g(this._value)
	}

	static fromNullable(val) {
		return isNil(val) ? Maybe.Nothing() : Maybe.Just(val)
	}
}

module.exports = construct(Maybe)