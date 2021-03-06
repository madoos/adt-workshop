const {
	inspect
} = require('util')

const {
	construct
} = require('./util')

const {
	pipe
} = require('ramda')

class IO {
	constructor(unsafePerformIO) {
		this.unsafePerformIO = unsafePerformIO
	}

	// -- Pointed
	static of (value) {
		return new IO(() => value)
	}

	// --Functor
	map(f) {
		return new IO(pipe(this.unsafePerformIO, f))
	}

	// --Monad
	chain(f) {
		return this.map(f).join()
	}

	join() {
		return new IO(() => {
			return this.unsafePerformIO().unsafePerformIO()
		})
	}

	// -- applicative
	ap(io) {
		return this.chain(val => io.map(f => f(val)));
	}

	// -- utils

	toString() {
		return `IO(${this.unsafePerformIO})`
	}

	[inspect.custom]() {
		return this.toString()
	}

	// iofy :: * -> b -> * -> IO b
	static iofy(f) {
		return (...args) => {
			return new IO(() => f(...args))
		}
	}
}

module.exports = construct(IO)