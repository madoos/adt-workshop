const equals = require('deep-equal')
const laws = require('./adt.laws')
const Stream = require('./Stream')
const noop = () => {}

const isEquivalent = (x, y) => {
	const xValues = []
	const yValues = []

	return new Promise((resolve) => {
		x.subscribe(
			val => xValues.push(val),
			noop,
			() => y.subscribe(
				val => yValues.push(val),
				noop,
				() => resolve(equals(xValues, yValues))
			)
		)
	})
}

describe('Stream', () => {
	laws.prove({
		type: Stream,
		adt: [
			"monoid",
			"functor",
			"applicativeFunctor",
			"pointedFunctor",
			"monad"
		],
		isEquivalent: isEquivalent,
		value: (handler) => {
			handler.next(1)
			handler.next(2)
			handler.complete()
			return noop
		}
	})
})