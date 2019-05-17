const {
	construct
} = require('./util')
const {
	inspect
} = require('util')

class Right {
	constructor(val) {
		this._value = val
	}

	get isRight() {
		return true
	}

	// -- functor
	map(f) {
		return new Right(f(this._value))
	}

	// -- applicative
	ap(either) {
		return this.chain(
			value => either.map(f => f(value))
		)
	}

	// -- apply
	static of (value) {
		return new Right(value)
	}

	// -- monad
	chain(f) {
		return this.map(f).join()
	}

	join() {
		return this._value
	}

	// -- utils
	toString() {
		return `Right(${this._value})`
	}

	[inspect.custom]() {
		return this.toString()
	}

	fold(f, g) {
		return g(this._value)
	}
}

class Left {
	constructor(val) {
		this._value = val
	}

	get isLeft() {
		return true
	}

	// -- functor
	map(f) {
		return this
	}

	// -- applicative
	ap(maybe) {
		return this
	}

	// -- apply
	static of (value) {
		return new Left(value)
	}

	// -- monad
	chain(f) {
		return this
	}

	// -- utils
	toString() {
		return `Left(${this._value})`
	}

	[inspect.custom]() {
		return this.toString()
	}

	fold(f, g) {
		return f(this._value)
	}
}


const Either = construct(class Either {
	constructor(value) {
		this._value = value;
	}

	static of (value) {
		return new Right(value);
	}
})

Either.Right = construct(Right)
Either.Left = construct(Left)

module.exports = Either