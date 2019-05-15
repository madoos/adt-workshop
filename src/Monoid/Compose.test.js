const laws = require('../adt.laws')
const Compose = require('./Compose')
const {
	inc
} = require('ramda')

describe('Compose', () => {
	laws.monoid({
		type: Compose,
		isEquivalent: (x, y) => Promise.resolve(x._f(10) === y._f(10)),
		value: inc
	})
})