const {
  inspect
} = require('util')

const {
  construct
} = require('./util')

const {
  isNil
} = require('ramda')

class Maybe {
  constructor(value) {
    this._value = value
  }

  // -- Pointed
  static of (value) {
    return new Maybe(value)
  }

  // --Functor
  map(f) {
    return this.isNothing() ? this : new Maybe(f(this._value))
  }

  // --Monad
  chain(f) {
    return this.map(f).join()
  }

  join() {
    return this.isNothing() ? this : this._value
  }

  // -- applicative
  ap(maybe) {
    return this.isNothing() ? this : maybe.map(this._value)
  }

  // -- utils
  isNothing() {
    return isNil(this._value)
  }

  toString() {
    return this.isNothing() ? `Nothing()` : `Just(${this._value})`
  }

  [inspect.custom]() {
    return this.toString()
  }
}

module.exports = construct(Maybe)