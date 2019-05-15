const laws = require('./adt.laws.js')
const Identity = require('./Identity')

describe('Identity', () => {
	laws.prove({
		type: Identity,
		isEquivalent: (x, y) => Promise.resolve(x._value === y._value),
		adt: [
			"functor",
			"applicativeFunctor",
			"pointedFunctor",
			"monad"
		]
	})
})