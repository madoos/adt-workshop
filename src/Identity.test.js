const Identity = require('./Identity')

const isEquivalent = (x, y) => x._value === y._value

const {
	identity,
	pipe,
	inc,
	prop
} = require('ramda')


describe('Functor laws (.map)', () => {
	test('identity', () => {
		const x = Identity(1)
		const y = x.map(identity)

		expect(
			isEquivalent(x, y)
		).toEqual(true)

	})

	test('composition', () => {
		const user = Identity({
			age: 32
		})
		const x = user.map(
			pipe(prop('age'), inc)
		)

		const y = user.map(prop('age')).map(inc)

		expect(
			isEquivalent(x, y)
		).toEqual(true)
	})
})

describe('Applicative Functor laws (.ap)', () => {
	test('composition', () => {
		const compose = f => g => x => f(g(x))
		const one = Identity(1)
		const plus = Identity(n => n + 1)
		const double = Identity(n => n * 2)

		const x = one.ap(
			plus.ap(
				double.map(compose)
			)
		)

		const y = one.ap(plus).ap(double)
		expect(isEquivalent(x, y)).toEqual(true)
	})


})

describe('Pointed functor laws (.of)', () => {
	test('Identity', () => {
		//	v.ap(A.of(x => x)) === v
		const value = Identity(1)
		const x = value.ap(Identity.of(identity))

		expect(
			isEquivalent(x, value)
		).toEqual(true)
	})

	test('Homomorphism', () => {
		// A.of(x).ap(A.of(f)) === A.of(f(x))

		const plus = (n) => n + 1
		const value = Identity.of(1)
		const plusIdentity = Identity.of(plus)

		const x = value.ap(plusIdentity)
		const y = Identity.of(plus(1))

		expect(
			isEquivalent(x, y)
		).toEqual(true)

	})

	test('Interchange', () => {
		// A.of(y).ap(u) === u.ap(A.of(f => f(y)))
		const plus = (n) => n + 1
		const value = Identity.of(1)
		const plusIdentity = Identity.of(plus)

		const x = value.ap(plusIdentity)
		const y = plusIdentity.ap(Identity.of((f => f(1))))

		expect(
			isEquivalent(x, y)
		).toEqual(true)

	})
})

describe('Monad laws (.chain)', () => {
	test('Left identity', () => {
		// f :: a -> Ma
		// M.of(a).chain(f) === f(a)
		const f = n => Identity(n)
		const value = 1

		const x = Identity.of(value).chain(f)
		const y = f(value)

		expect(
			isEquivalent(x, y)
		).toEqual(true)

	})

	test('Rithg identity', () => {
		// f :: a -> Ma
		// m.chain(M.of) === m
		const value = 1

		const x = Identity(value).chain(Identity.of)
		const y = Identity(value)

		expect(
			isEquivalent(x, y)
		).toEqual(true)

	})
})