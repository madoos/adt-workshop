const equals = require('deep-equal')
const laws = require('./adt.laws')
const WrapStream = require('./NodeStream')
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
		type: WrapStream,
		adt: [
			"functor",
			"applicativeFunctor",
			"pointedFunctor",
			"monad"
		],
		isEquivalent: isEquivalent
	})
})