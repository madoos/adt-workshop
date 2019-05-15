const laws = require('../adt.laws')
const Sum = require('./Sum')

describe('Sum', () => {
	laws.monoid({
		type: Sum,
		isEquivalent: (x, y) => Promise.resolve(x._value === y._value),
		value: 10
	})
})