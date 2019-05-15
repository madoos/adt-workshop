const {
	log
} = require('../../src/util')

const {
	curry,
	multiply,
	inc
} = require('ramda')

const Sum = require('../../src/Monoid/Sum')
const Max = require('../../src/Monoid/Max')
const Compose = require('../../src/Monoid/Compose')
const Stream = require('../../src/Stream')

const fold = curry((Monoid, xs) => xs.reduce((acc, val) => acc.concat(Monoid(val)), Monoid.empty()))
const foldMap = curry((Monoid, f, xs) => xs.reduce((acc, x) => acc.concat(f(x)), Monoid.empty()))


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
		"fold": fold(Compose, [multiply(100), inc])._f(1),
		"empty": fold(Compose, [])._f(1)
	}
)

foldMap(
	Stream,
	Stream.from,
	[
		[1, 2],
		[3, 4],
		[5, 6]
	]
).subscribe(log('Stream foldMap'))

foldMap(
	Stream,
	Stream.from,
	[]
).subscribe(log('Stream foldMap'), log('error'), () => log('Stream', 'empty'))