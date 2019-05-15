const laws = require('../adt.laws')
const Max = require('./Max')

describe('Max', () => {
	laws.monoid({
		type: Max,
		isEquivalent: (x, y) => Promise.resolve(x._value === y._value),
		value: 20
	})
})