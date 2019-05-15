const FL = require('fantasy-land')
const {
	curry
} = require('ramda')

const construct = (Constructor) => {
	const wrappedConstructor = (...args) => new Constructor(...args)

	Object.getOwnPropertyNames(Constructor)
		.filter(prop => typeof Constructor[prop] === "function")
		.forEach((prop) => wrappedConstructor[prop] = curry(Constructor[prop]))

	Object.getOwnPropertyNames(Constructor.prototype)
		.filter(prop => !['constructor', 'toString'].includes(prop) && FL[prop])
		.forEach((prop) => Constructor.prototype[FL[prop]] = Constructor.prototype[prop])

	return wrappedConstructor
}

const log = curry((tag, data) => console.log(tag, data))

const secret = {
	algorithm: 'aes-256-ctr',
	password: 'd6F3Efeq'
}

module.exports = {
	construct,
	log,
	secret
}