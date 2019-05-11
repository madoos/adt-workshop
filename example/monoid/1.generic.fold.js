const {
	log
} = require('../../src/util')

const {
	curry,
	multiply,
	inc
} = require('ramda')

const Sum = require('./src/Sum')
const Max = require('./src/Max')
const Compose = require('./src/Compose')

const fold = curry((Monoid, xs) => xs.reduce((acc, val) => acc.concat(Monoid(val)), Monoid.empty())._value)

log(
	'Sum:', {
		"fold": fold(Sum, [10, 20, 30]),
		"empty": fold(Sum, [])
	}
)

log(
	'Max:', {
		"fold": fold(Max, [1, 2, 5, 10]),
		"empty": fold(Max, [])
	}
)

log(
	'Compose:', {
		"fold": fold(Compose, [multiply(100), inc])(1),
		"empty": fold(Compose, [])(1)
	}
)