const equals = require('deep-equal')
const laws = require('./adt.laws')
const WrapStream = require('./NodeStream')
const {
	Readable
} = require('readable-stream')
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
			"monoid",
			"functor",
			"applicativeFunctor",
			"pointedFunctor",
			"monad"
		],
		isEquivalent: isEquivalent,
		value: () => {
			return new Readable({
				objectMode: true,
				read() {
					this.push(1)
					this.push(null)
				}
			})
		}
	})
})