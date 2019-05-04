const {
	inspect
} = require('util')

const {
	construct
} = require('./util')

const {
	pipe
} = require('ramda')

class Future {
	constructor(fork) {
		this.fork = fork
	}

	// -- pointed
	static of (value) {
		return new Future((reject, resolve) => resolve(value))
	}

	// -- functor
	map(f) {
		return new Future((reject, resolve) => {
			this.fork(reject, pipe(f, resolve))
		})
	}

	// -- monad
	chain(f) {
		return this.map(f).join()
	}

	join() {
		return new Future((reject, resolve) => {
			return this.fork(reject, (future) => future.fork(reject, resolve))
		})
	}

	// -- applicative
	ap(future) {
		return this.map(f => future.map(f)).join()
	}
	// -- utils

	toString() {
		return `Future(?)`
	}

	[inspect.custom]() {
		return this.toString()
	}

	// futurify :: nodeCallback -> * -> Future e b 
	static futurify(f) {
		return (...args) => {
			return new Future((reject, resolve) =>
				f(...args, (err, data) => err ? reject(err) : resolve(data)))
		}
	}

	// futurifyP:: (* -> Promise e b)-> (* -> Future e b) 
	static futurifyP(f) {
		return (...args) => {
			return new Future((reject, resolve) => {
				return f(...args).catch(reject).then(resolve)
			})
		}
	}

}

module.exports = construct(Future)