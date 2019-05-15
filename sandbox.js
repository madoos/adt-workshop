const {
	List,
	monoid,
	NodeStream,
	Future,
	Identity,
	util
} = require('./src')

const {
	log
} = util

const {
	inc,
	multiply,
	o,
	lift,
	prop,
	curry,
	toString,
	toUpper
} = require('ramda')

const {
	createReadStream
} = require('fs')