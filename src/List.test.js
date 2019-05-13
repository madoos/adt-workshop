const List = require('./List')
const equal = require('deep-equal');
const laws = require('./adt.laws')

describe('List', () => {
	laws.prove({
		type: List,
		adt: [
			"monoid",
			"functor",
			"applicativeFunctor",
			"pointedFunctor",
			"monad"
		],
		isEquivalent: (x, y) => Promise.resolve(equal(x._values, y._values)),
		value: [1, 2, 3, 4, 5]
	})
})