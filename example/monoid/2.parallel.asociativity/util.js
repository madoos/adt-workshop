const {
	pipe,
	tap,
	curry
} = require('ramda')

const {
	stringify,
	parse
} = JSON

const sleep = (ms) => {
	const date = new Date();
	let curDate = null;
	do {
		curDate = new Date();
	}
	while (curDate - date < ms);
}

// encrypt :: {} -> base64 
const encrypt = pipe(
	stringify,
	(s) => Buffer.from(s).toString('base64')
)

// decrypt :: base64 -> {}
const decrypt = pipe(
	tap(() => sleep(5000)), // it takes 5 seconds
	(s) => Buffer.from(s, 'base64').toString('ascii'),
	parse
)

const {
	fork
} = require('child_process');


// decryptInAnotherThread :: processorPath -> base64 -> Promise {}
const decryptInAnotherThread = curry((path, message) => {
	const thread = fork(path);
	thread.send(message)
	return new Promise((resolve) => {
		thread.on('message', resolve)
	})
})


// fold :: Monoid m => (a -> m) -> [a] -> m
const fold = curry((Monoid, xs) => xs.reduce((acc, val) => acc.concat(Monoid(val)), Monoid.empty())._value)

// mapParallel :: (a -> Promise b) -> [a] -> Promise [b]
const mapParallel = curry((f, xs) => Promise.all(xs.map(f)))

module.exports = {
	encrypt,
	decrypt,
	decryptInAnotherThread,
	sleep,
	fold,
	mapParallel
}