const {
	createReadStream
} = require('fs')
const {
	createDecipher
} = require('crypto');
const {
	pipe,
	map,
} = require('ramda')
const {
	secret
} = require('../../src/util')

const NodeStream = require('../../src/NodeStream')

// decryptFile :: path -> NodeStream
const decryptFile = pipe(
	NodeStream.streamify(createReadStream),
	map(createDecipher(secret.algorithm, secret.password)),
)

// run program
decryptFile(`${__dirname}/encrypted.txt`)
	.subscribe(process.stdout)