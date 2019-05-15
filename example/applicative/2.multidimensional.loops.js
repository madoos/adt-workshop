const {
	lift
} = require('ramda')
const {
	List,
	util
} = require('../../src')
const {
	log
} = util

const sizes = List(['S', 'M', 'L'])
const colors = List(['green', 'red', 'yellow'])
const types = List(['basic', 'gold', 'platinum'])

const combine = lift((size, color, type) => `${size}-${color}-${type}`)

log(
	'result:',
	combine(sizes, colors, types)
)