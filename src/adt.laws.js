const {
	identity,
	pipe,
	inc,
	multiply,
	o,
	forEachObjIndexed,
	applyTo,
	pick
} = require('ramda')

const monoid = ({
	type: Monoid,
	isEquivalent,
	value
}) => {
	describe('Monoid laws', () => {
		test('Left identity "M(x).concat(M.empty()) === M(x)"', () => {
			const x = Monoid(value).concat(Monoid.empty())
			const y = Monoid(value)
			return isEquivalent(x, y).then((result) => expect(result).toEqual(true))
		})

		test('Right identity "M.empty().concat(M(x)) === M(x)"', () => {
			const x = Monoid.empty().concat(Monoid(value))
			const y = Monoid(value)
			return isEquivalent(x, y).then((result) => expect(result).toEqual(true))
		})
	})
}

const functor = ({
	isEquivalent,
	type: Functor,
}) => {
	describe(`Functor laws (.map)`, () => {
		test('identity "x.map(val => val) === x"', () => {
			const x = Functor.of(1)
			const y = x.map(identity)
			return isEquivalent(x, y).then((result) => expect(result).toEqual(true))
		})

		test('composition "x.map(f).map(g) === x.map(val => g(f(val)))"', () => {
			const src = Functor.of(1)
			const x = src.map(inc).map(multiply(10))
			const y = src.map(pipe(inc, multiply(10)))
			return isEquivalent(x, y).then((result) => expect(result).toEqual(true))
		})
	})
}

const applicativeFunctor = ({
	isEquivalent,
	type: Functor,
}) => {
	describe('Applicative Functor laws (.ap)', () => {
		test('composition "x.ap(g.ap(f.map(compose))) === x.ap(g).ap(f)"', () => {
			const src = Functor.of(1)
			const f = Functor.of(inc)
			const g = Functor.of(multiply(10))
			const x = src.ap(g.ap(f.map(o)))
			const y = src.ap(g).ap(f)
			return isEquivalent(x, y).then((result) => expect(result).toEqual(true))
		})
	})
}

const pointedFunctor = ({
	isEquivalent,
	type: Functor,
}) => {
	describe('Pointed functor laws (.of)', () => {
		test('Identity "x.ap(A.of(val => val)) === x"', () => {
			const x = Functor.of(1)
			const y = x.ap(Functor.of(identity))
			return isEquivalent(x, y).then((result) => expect(result).toEqual(true))
		})

		test('Homomorphism "A.of(val).ap(A.of(f)) === A.of(f(val))"', () => {
			const value = 1
			const x = Functor.of(value).ap(Functor.of(inc))
			const y = Functor.of(inc(value))
			return isEquivalent(x, y).then((result) => expect(result).toEqual(true))
		})

		test('Interchange "A.of(val).ap(f) === f.ap(A.of(f => f(val)))"', () => {
			const value = 1
			const x = Functor.of(value).ap(Functor.of(inc))
			const y = Functor.of(inc).ap(Functor.of(f => f(value)))
			return isEquivalent(x, y).then((result) => expect(result).toEqual(true))
		})

	})
}

const monad = ({
	isEquivalent,
	type: Monad,
}) => {
	describe('Monad laws (.chain)', () => {
		test('Left identity "M.of(val).chain(f) === f(val)"', () => {
			const plus = n => Monad.of(inc(n))
			const value = 1
			const x = Monad.of(value).chain(plus)
			const y = plus(value)
			return isEquivalent(x, y).then((result) => expect(result).toEqual(true))
		})

		test('Rithg identity "m.chain(M.of) === m"', () => {
			const x = Monad.of(1)
			const y = x.chain(Monad.of)
			return isEquivalent(x, y).then((result) => expect(result).toEqual(true))
		})
	})
}

const _laws = {
	monoid,
	functor,
	applicativeFunctor,
	pointedFunctor,
	monad
}

const prove = (src) => {
	const tests = pick(src.adt, _laws)
	return forEachObjIndexed(applyTo(src), tests)
}

module.exports = {
	..._laws,
	prove
}