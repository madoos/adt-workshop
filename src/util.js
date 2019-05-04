const FL = require('fantasy-land')
const {
	curry
} = require('ramda')

const construct = (Constructor) => {
	const wrappedConstructor = (...args) => new Constructor(...args)

	Object.getOwnPropertyNames(Constructor).filter(prop => typeof Constructor[prop] === "function").forEach((methodName) => {
		const method = Constructor[methodName]
		wrappedConstructor[methodName] = curry(method)
	})

	Constructor.prototype[FL.map] = Constructor.prototype.map
	Constructor.prototype[FL.chain] = Constructor.prototype.chain
	Constructor.prototype[FL.ap] = Constructor.prototype.ap
	wrappedConstructor[FL.of] = wrappedConstructor.of
	return wrappedConstructor
}

module.exports = {
	construct
}