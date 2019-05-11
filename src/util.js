const FL = require('fantasy-land')
const {
	curry,
	curryN
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

const log = curry((tag, data) => console.log(tag, data))

module.exports = {
	construct,
	log
}