const laws = require('./adt.laws')
const Maybe = require('./Maybe')

describe('Maybe', () => {
	laws.prove({
		type: Maybe,
		adt: [
			"functor",
			"applicativeFunctor",
			"pointedFunctor",
			"monad"
		],
		isEquivalent: (x, y) => Promise.resolve(x._value === y._value)
	})
})