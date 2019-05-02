const {
	inspect
} = require('util')

const {
	construct
} = require('./util')

const {
	Transform,
	Readable
} = require('stream')

const OPT = {
	objectMode: true
}

const mapTransform = (f) => new Transform({
	objectMode: true,
	transform: (data, enc, done) => done(null, f(data))
})

class WrapStream {
	constructor(getStream) {
		this._getStream = getStream
	}

	// -- pointed
	static of (value) {
		return new WrapStream(() => {
			const stream = new Readable(OPT)
			stream.push(value)
			stream.push(null)
			return stream
		})
	}

	static from(iterable) {
		return new WrapStream(() => {
			const stream = new Readable(OPT)
			for (let item of iterable) stream.push(item)
			stream.push(null)
			return stream
		})
	}

	// -- functor 
	map(f) {
		return new WrapStream(() => {
			return this._getStream().pipe(mapTransform(f))
		})
	}

	// -- monad
	chain(f) {
		return this.map(f).join()
	}

	join() {
		return new WrapStream(() => {
			return this._getStream().pipe(new Transform({
				objectMode: true,
				transform: (stream, enc, done) => {
					stream.forEach({
						next: (data) => done(null, data),
						error: (e) => done(e)
					})
				}
			}))
		})
	}

	// applicative
	ap(wrapStream) {
		return this.chain((f) => {
			return wrapStream.map(f)
		})
	}

	// -- consume 
	forEach(handler) {
		const noop = () => {}
		this._getStream()
			.on('data', handler.next || noop)
			.on('error', handler.error || noop)
			.on('finish', handler.complete || noop)
	}

	// -- utils
	toString() {
		return `WrapStream(?)`
	}

	[inspect.custom]() {
		return this.toString()
	}

	//  streamify :: (* -> NodeStream) ->  (* -> WrapStream) 
	static streamify(f) {
		return (...args) => new WrapStream(() => f(...args))
	}
}

module.exports = construct(WrapStream)