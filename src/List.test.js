const List = require('./List')
const equal = require('deep-equal');
const isEquivalent = (listA, listB) => equal(listA._values, listB._values)

const {
	inc,
	multiply,
	pipe,
	identity
} = require('ramda')

describe('Monoid laws', () => {
	test('Left identity', () => {
		//M(x).concat(M.empty()) === M(x)
		const values = [1, 2, 3]
		const x = List(values)
		const y = x.concat(List.empty())

		expect(
			isEquivalent(x, y)
		).toEqual(true)
	})

	test('Right identity', () => {
		// M.empty().concat(M(x)) === M(x)
		const values = [1, 2, 3]
		const x = List(values)
		const y = List.empty().concat(x)

		expect(
			isEquivalent(x, y)
		).toEqual(true)
	})
})

describe('Functor laws', () => {
	test('Identity', () => {
		const x = List([1, 2, 3])
		const y = x.map(identity)

		expect(
			isEquivalent(x, y)
		).toEqual(true)
	})

	test('Composition', () => {
		const values = [1, 2, 3]
		const x = List(values).map(inc).map(multiply(2))
		const y = List(values).map(pipe(inc, multiply(2)))

		expect(
			isEquivalent(x, y)
		).toEqual(true)
	})
})

describe('Applicative laws', () => {
	test('Composition', () => {
		const compose = f => g => x => f(g(x))
		const numbers = List([1, 2])
		const plus = List([n => n + 1])
		const double = List([n => n * 2])

		const x = numbers.ap(plus).ap(double)

		const y = numbers.ap(
			plus.ap(
				double.map(compose)
			)
		)

		expect(
			isEquivalent(x, y)
		).toEqual(true)

	})
})

describe('Pointed functor laws', () => {
	test('Identity', () => {
		const numbers = List([1])
		const identityList = List.of(identity)
		const x = numbers.ap(identityList)

		expect(
			isEquivalent(x, numbers)
		).toEqual(true)
	})

	test('Homomorphism', () => {
		const plus = (n) => n + 1
		const value = List.of(1)
		const plusList = List.of(plus)

		const x = value.ap(plusList)
		const y = List.of(plus(1))

		expect(
			isEquivalent(x, y)
		).toEqual(true)

	})

	test('Interchange', () => {
		const plus = (n) => n + 1
		const value = List.of(1)
		const plusList = List.of(plus)
		const x = value.ap(plusList)
		const y = plusList.ap(List.of((f => f(1))))

		expect(
			isEquivalent(x, y)
		).toEqual(true)

	})
})


describe('Monad laws', () => {
	test('Left Identity', () => {
		// f :: a -> Ma
		// M.of(a).chain(f) === f(a)
		const value = 1
		const plus = (value) => List.of(value).map(inc)
		const x = List.of(value).chain(plus)
		const y = plus(1)

		expect(
			isEquivalent(x, y)
		).toEqual(true)
	})

	test('Rithg identity', () => {
		// f :: a -> Ma
		// m.chain(M.of) === m
		const x = List([1, 2, 3])
		const y = x.chain(List.of)

		expect(
			isEquivalent(x, y)
		).toEqual(true)

	})
})