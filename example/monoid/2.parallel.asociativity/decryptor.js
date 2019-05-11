const {
	decrypt
} = require('./util')

const Stream = require('../../../src/Stream')
const encryptedUsers$ = Stream.fromEvent('message', process)

encryptedUsers$
	.map(decrypt)
	.subscribe(
		(user) => process.send(user)
	)