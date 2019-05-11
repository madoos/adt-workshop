const {
	inspect
} = require('util')

const {
	construct
} = require('./util')

const {
	unary
} = require('ramda')


class List {
	constructor(values) {
		this._values = values
	}

	// -- monoid
	static empty() {
		return new List([])
	}

	concat(list) {
		return new List(
			this._values.concat(list._values)
		)
	}

	// -- functor
	map(f) {
		return new List(this._values.map(unary(f)))
	}

	// -- applicative
	ap(list) {
		return new List(
			[].concat(
				...list._values.map(
					f => this._values.map(unary(f))
				)
			)
		)
	}

	// -- pointed				
	static of (value) {
		return new List([value])
	}

	// -- monad
	chain(f) {
		return this.map(f).join()
	}

	join() {
		return new List(
			[].concat(
				...this._values.map(list => list._values)
			)
		)
	}

	// utils
	toString() {
			return `List(${this._values})`
		}
		[inspect.custom]() {
			return this.toString()
		}

}

module.exports = construct(List)