const Point = require('./Point')

describe('Setoid laws', () => {
	test('Reflexivity', () => {
		const point = Point(2, 2)

		expect(
			point.equals(point)
		).toEqual(true)

	})

	test('Symmetry', () => {
		const pointA = Point(2, 2)
		const pointB = Point(2, 2)

		expect(
			pointA.equals(pointB)
		).toEqual(true)

		expect(
			pointB.equals(pointA)
		).toEqual(true)
	})

	test('Transitivity', () => {
		const pointA = Point(2, 2)
		const pointB = Point(2, 2)
		const pointC = Point(2, 2)

		expect(
			pointA.equals(pointB)
		).toEqual(true)

		expect(
			pointB.equals(pointC)
		).toEqual(true)

		expect(
			pointA.equals(pointC)
		).toEqual(true)
	})
})

describe('Ord laws', () => {
	test('Totality', () => {
		const pointA = Point(2, 2)
		const pointB = Point(3, 3)

		expect(
			pointA.lte(pointB) || pointA.lte(pointB)
		).toEqual(true)
	})

	test('Antisymmetry', () => {
		const pointA = Point(2, 2)
		const pointB = Point(2, 2)

		expect(
			pointA.lte(pointB)
		).toEqual(true)

		expect(
			pointB.lte(pointA)
		).toEqual(true)

		expect(
			pointB.equals(pointA)
		).toEqual(true)
	})

	test('Transitivity', () => {
		const pointA = Point(1, 1)
		const pointB = Point(2, 2)
		const pointC = Point(3, 3)

		expect(
			pointA.lte(pointB)
		).toEqual(true)

		expect(
			pointB.lte(pointC)
		).toEqual(true)

		expect(
			pointA.lte(pointC)
		).toEqual(true)
	})
})