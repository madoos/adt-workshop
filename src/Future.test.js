const Future = require('./Future')
const equals = require('deep-equal')
const noop = () => {}
const laws = require('./adt.laws.js')

// isEquivalent :: (Future, Future) -> Promise Boolean
const isEquivalent = (futureX, futureY) => {
	return new Promise((resolve) => {
		futureX.fork(noop, (x) => futureY.fork(noop, (y) => resolve(equals(x, y))))
	})
}

describe('Future', () => {
	laws.prove({
		type: Future,
		isEquivalent: isEquivalent,
		adt: [
			"functor",
			"applicativeFunctor",
			"pointedFunctor",
			"monad"
		]
	})
})