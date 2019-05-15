const {
	curry,
	pluck,
	pipe,
	pipeP,
	map,
	tap,
	prop
} = require('ramda')

const {
	log
} = require('../../../src/util')

const {
	fold,
	mapParallel,
	decrypt,
	decryptInAnotherThread
} = require('./util')

const foldMapP = curry((Monoid, f, xs) => {
	return pipeP(
		mapParallel(f),
		fold(Monoid)
	)(xs)
})

const Sum = require('../../../src/Monoid/Sum')

// users :: { name, balance }
const users = [
	'eyJuYW1lIjoiU2FyYSIsImJhbGFuY2UiOjIzNTEuNX0=',
	'eyJuYW1lIjoiSGVuIiwiYmFsYW5jZSI6MjMwLjcxfQ==',
	'eyJuYW1lIjoiUm94IiwiYmFsYW5jZSI6ODc4OS4zNH0=',
	'eyJuYW1lIjoiT2x5bXBpYSIsImJhbGFuY2UiOjM0NTc2LjU2fQ=='
]

const decryptParallel = pipeP(
	decryptInAnotherThread(`${__dirname}/decryptor.js`),
	prop('balance'),
)

// getBankBalanceP :: users -> Promise Number
const getBankBalanceP = foldMapP(
	Sum,
	decryptParallel
)

// getBankBalance :: users -> Number
const getBankBalance = pipe(
	map(decrypt),
	pluck('balance'),
	fold(Sum)
)

// ############################# Program ##############################

const start = process.hrtime()

// parallel associativity
getBankBalanceP(users).
then((balance) => {
	const end = process.hrtime(start)
	log('Total Balance', balance)
	log('Execution time in parallel: %ds', end[0])
})

/*
// process in same thread
log('Total Balance:', getBankBalance(users))
log('Execution time in parallel: %ds', process.hrtime(start)[0])
*/