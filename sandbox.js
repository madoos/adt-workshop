const {
	NodeStream
} = require('./src')

const {
	inc,
	multiply,
	o
} = require('ramda')


const src = NodeStream.of(1)
const plus = NodeStream.of(inc)
const multiply10 = NodeStream.of(multiply(10))
const x = src.ap(multiply10.ap(plus.map(o)))
const y = src.ap(multiply10).ap(plus)

//return isEquivalent(x, y).then((result) => expect(result).toEqual(true))

x.subscribe(
	(data) => {
		console.log(data)
	},
	(e) => {
		console.log(e)
	},
	() => {
		console.log('------------------------> completed')
	}
)