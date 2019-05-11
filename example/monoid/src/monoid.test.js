const equal = require('deep-equal');
const isEquivalentValue = (mA, mB) => equal(mA._value, mB._value)
const isEquivalentExecution = (mA, mB) => equal(mA._value(1), mB._value(1))

const Sum = require('./Sum')
const Max = require('./Max')
const Compose = require('./Compose')

const proveLaws = ({
	tag,
	Monoid,
	isEquivalent,
	value
}) => {
	describe(tag, () => {
		test('Left identity "M(x).concat(M.empty()) === M(x)"', () => {
			expect(
				isEquivalent(
					Monoid(value).concat(Monoid.empty()),
					Monoid(value)
				)
			).toEqual(true)
		})

		test('Right identity "M.empty().concat(M(x)) === M(x)"', () => {
			expect(
				isEquivalent(
					Monoid.empty().concat(Monoid(value)),
					Monoid(value)
				)
			).toEqual(true)
		})
	})
}

proveLaws({
	tag: 'Sum monoid laws',
	Monoid: Sum,
	isEquivalent: isEquivalentValue,
	value: 1
})

proveLaws({
	tag: 'Max monoid laws',
	Monoid: Max,
	isEquivalent: isEquivalentValue,
	value: 10
})

proveLaws({
	tag: 'Compose monoid laws',
	Monoid: Compose,
	isEquivalent: isEquivalentExecution,
	value: n => n + 1
})