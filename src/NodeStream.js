const {
	inspect
} = require('util')

const {
	construct
} = require('./util')

const {
	Transform,
	Readable
} = require('readable-stream')

const OPT = {
	objectMode: true
}

// isFunction :: a -> Boolean
const isFunction = (x) => typeof x === 'function'

// isPromise :: a -> Boolean
const isPromise = (x) => Object(x).constructor === Promise

// noop :: void -> void
const noop = () => {}

// mapTransform :: ((a -> b) | (a -> Promise e b)) -> Transform b
const mapTransform = (f) => new Transform({
	objectMode: true,
	transform(data, _, done) {
		try {
			const x = f(data)
			if (isPromise(x)) x.then((_data) => done(null, _data)).catch(done)
			else done(null, x)
		} catch (e) {
			done(e)
		}
	}
})

// handleMapTransform :: ((a -> b) | Transform b) -> Transform b
const handleMapTransform = (x) => isFunction(x) ? mapTransform(x) : x

// joinTransform :: () -> Transform a
const joinTransform = () => new Transform({
	objectMode: true,
	transform: (wrapStream, _, done) => {
		wrapStream.subscribe((data) => done(null, data), (e) => done(e))
	}
})
class WrapStream {
	// constructor :: () -> NodeStream -> WrapStream
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

	static fromPromise(promise) {
		return new WrapStream(() => {
			const stream = new Readable(OPT)

			promise
				.then((value) => {
					stream.push(value)
					stream.push(null)
				})
				.catch((e) => {
					stream.emit('error', e)
				})

			return stream
		})
	}

	//  streamify :: (* -> NodeStream) ->  (* -> WrapStream) 
	static streamify(f) {
		return (...args) => new WrapStream(() => f(...args))
	}

	//  streamifyP :: (* -> Promise e a) ->  (* -> WrapStream a) 
	static streamifyP(f) {
		return (...args) => new WrapStream(() => WrapStream.fromPromise(f(...args)))
	}

	// -- functor 
	map(f) {
		return new WrapStream(() =>
			this._getStream().pipe(handleMapTransform(f))
		)
	}

	// -- monad
	chain(f) {
		return this.map(f).join()
	}

	join() {
		return new WrapStream(() =>
			this._getStream().pipe(joinTransform())
		)
	}

	// -- applicative
	ap(wrapStream) {
		return this.chain((val) =>
			wrapStream.map(f => {
				return f(val)
			})
		)
	}

	// transform :: (NodeStream -> NodeStream) -> WrapStream
	transform(f) {
		return new WrapStream(() => {
			return f(this._getStream())
		})
	}

	// -- consume 
	forEach({
		next,
		error,
		complete
	}) {

		const isConsumedWithFunction = isFunction(next) || next === undefined
		const completeEvent = isConsumedWithFunction ? 'end' : 'finish'

		const stream = isConsumedWithFunction ?
			this._getStream().on('data', next || noop) :
			this._getStream().pipe(next)

		return stream
			.on('error', error || noop)
			.on(completeEvent, complete || noop)

	}

	subscribe(next, error, complete) {
		return this.forEach({
			next,
			error,
			complete
		})
	}

	// -- utils
	toString() {
		return `WrapStream(?)`
	}

	[inspect.custom]() {
		return this.toString()
	}

}

module.exports = construct(WrapStream)