const {
	NodeStream,
	List,
	monoid,
	Stream,
	Future,
	Identity
} = require('./src')

const {
	inc,
	multiply,
	o,
	lift,
	prop
} = require('ramda')





const {
	stat
} = require('fs')


const readSize = (path) => Future((reject, resolve) => {
	console.log('-------------->')
	stat(path, (err, data) => err ? reject(err) : resolve(data))
})

const readSizeP = (path) => new Promise((resolve, reject) => {
	stat(path, (err, data) => err ? reject(err) : resolve(data))
})

readSize(`${__dirname}/sandbox.js`).map(prop('size')).fork(console.log, console.log)

readSizeP(`${__dirname}/sandbox.js`).then(prop('size')).then(console.log)