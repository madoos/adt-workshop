const Point = require('./Ord.Point')

describe('Setoid laws', () => {
  test('Reflexivity', () => {
    const point = Point.create({
      x: 2,
      y: 2
    })

    expect(
      point.equals(point)
    ).toEqual(true)

  })

  test('Symmetry', () => {
    const pointA = Point.create({
      x: 2,
      y: 2
    })

    const pointB = Point.create({
      x: 2,
      y: 2
    })

    expect(
      pointA.equals(pointB)
    ).toEqual(true)

    expect(
      pointB.equals(pointA)
    ).toEqual(true)
  })

  test('Transitivity', () => {
    const pointA = Point.create({
      x: 2,
      y: 2
    })

    const pointB = Point.create({
      x: 2,
      y: 2
    })

    const pointC = Point.create({
      x: 2,
      y: 2
    })


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
    const pointA = Point.create({
      x: 2,
      y: 2
    })

    const pointB = Point.create({
      x: 3,
      y: 3
    })

    expect(
      pointA.lte(pointB) || pointA.lte(pointB)
    ).toEqual(true)
  })

  test('Antisymmetry', () => {
    const pointA = Point.create({
      x: 2,
      y: 2
    })

    const pointB = Point.create({
      x: 2,
      y: 2
    })

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
    const pointA = Point.create({
      x: 1,
      y: 1
    })

    const pointB = Point.create({
      x: 2,
      y: 2
    })

    const pointC = Point.create({
      x: 3,
      y: 3
    })


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