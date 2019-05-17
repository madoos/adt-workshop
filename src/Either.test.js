const Either = require('./Either')
const equals = require('deep-equal')
const laws = require('./adt.laws.js')

describe('Either.Right', () => {
	laws.prove({
		type: Either.Right,
		isEquivalent: (x, y) => Promise.resolve(equals(x._value, x._value)),
		adt: [
			"functor",
			"applicativeFunctor",
			"pointedFunctor",
			"monad"
		]
	})
})


describe('Either.Left', () => {
	laws.prove({
		type: Either.Left,
		isEquivalent: (x, y) => Promise.resolve(equals(x._value, x._value)),
		adt: [
			"functor",
			"applicativeFunctor",
			"pointedFunctor",
			"monad"
		]
	})
})