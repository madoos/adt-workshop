const laws = require('./adt.laws')
const IO = require('./IO')

describe('IO', () => {
	laws.prove({
		type: IO,
		adt: [
			"functor",
			"applicativeFunctor",
			"pointedFunctor",
			"monad"
		],
		isEquivalent: (x, y) => Promise.resolve(x.unsafePerformIO() === y.unsafePerformIO())
	})
})