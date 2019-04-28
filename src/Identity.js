const {
  inspect
} = require('util')

const {
  construct
} = require('./util')

class Identity {
  constructor(value) {
    this._value = value
  }

  // -- Pointed
  static of (value) {
    return new Identity(value)
  }

  // --Functor
  map(f) {
    return new Identity(f(this._value))
  }

  // --Monad
  chain(f) {
    return this.map(f).join()
  }

  join() {
    return this._value
  }

  // -- applicative
  ap(Identity) {
    return Identity.map(this._value)
  }

  // -- utils

  toString() {
    return `Identity(${this._value})`
  }

  [inspect.custom]() {
    return this.toString()
  }
}

module.exports = construct(Identity)