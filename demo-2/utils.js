const {
	curry
} = require('ramda')

const log = curry((tag, data) => console.log(tag, data))

const secret = {
	algorithm: 'aes-256-ctr',
	password: 'd6F3Efeq'
}

const lift = curry((f, a, b) => a.map(f).ap(b))

module.exports = {
	log,
	secret,
	lift
}