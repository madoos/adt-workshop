const {
	inspect
} = require('util')

const {
	construct
} = require('./util')

const {
	pipe
} = require('ramda')

class Stream {
	constructor(produceValues) {
		this._produceValues = produceValues
	}

	// -- pointed
	static of (value) {
		return new Stream((handler) => {
			handler.next(value)
			handler.complete()
			return () => {} // unsubscribe
		})
	}

	static from(iterable) {
		return new Stream((handler) => {
			for (let value of iterable) {
				handler.next(value)
			}

			handler.complete()
			return () => {} // unsubscribe
		})
	}

	// -- consume
	forEach({
		next,
		error,
		complete
	}) {
		const noop = () => {}
		return this._produceValues({
			next: next || noop,
			error: error || noop,
			complete: complete || noop
		})
	}

	subscribe(next, error, complete) {
		return this.forEach({
			next,
			error,
			complete
		})
	}

	// -- monoid
	concat(stream) {
		let unsubscribe
		return new Stream((handler) => {
			unsubscribe = this.forEach({
				next: data => handler.next(data),
				error: e => handler.error(e),
				complete: () => {
					unsubscribe = stream.forEach({
						next: data => handler.next(data),
						error: e => handler.error(e),
						complete: () => handler.complete()
					})
				}
			})

			return unsubscribe
		})
	}

	static empty() {
		return new Stream((handler) => {
			handler.complete()
			return () => {}
		})
	}

	// -- functor
	map(f) {
		return new Stream((handler) => {
			return this.forEach({
				next: (data) => handler.next(f(data)),
				error: (e) => handler.error(e),
				complete: () => handler.complete()
			})
		})
	}

	// -- monad
	chain(f) {
		return this.map(f).join()
	}

	join() {
		return new Stream((handler) => {
			return this.forEach({
				next: (stream) => stream.forEach({
					next: handler.next,
					error: handler.error
				}),
				error: (e) => handler.error(e),
				complete: () => handler.complete()
			})
		})
	}

	// -- applicative
	ap(stream) {
		return this.chain(val => stream.map(f => f(val)))
	}

	// -- utils
	toString() {
		return `Stream(?)`
	}

	[inspect.custom]() {
		return this.toString()
	}

	static create(produceValues) {
		return new Stream(produceValues)
	}

	static fromEvent(event, emitter) {
		return new Stream((handler) => {
			const isNative = Boolean(emitter.addEventListener)
			const add = isNative ? 'addEventListener' : 'on'
			const remove = isNative ? 'removeEventListener' : 'off'
			const next = (data) => handler.next(data)
			emitter[add](event, next)
			return () => emitter[remove](event, next)
		})
	}

	static intervalApply(f, ms) {
		let i = 0
		return new Stream((hander) => {
			const id = setInterval(() => hander.next(f(i++)), ms)
			return () => clearInterval(id)
		})
	}

	static streamify(f) {
		let canceled = false
		return (...args) => new Stream((handler) => {
			f(...args, (e, data) => {
				if (e) return handler.error(e)
				if (!canceled) {
					handler.next(data)
					handler.complete()
				}
			})

			return () => canceled = true
		})
	}

}

module.exports = construct(Stream)