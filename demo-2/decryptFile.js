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
} = require('./utils')

const NodeStream = require('../src/NodeStream')
const readFileStream = NodeStream.streamify(createReadStream)

const ENCRYPTED_FILE_PATH = `${__dirname}/encrypted.txt`

// readDecryptFile :: path -> NodeStream
const readDecryptFile = pipe(
	readFileStream,
	map(createDecipher(secret.algorithm, secret.password)),
)

// run program
readDecryptFile(ENCRYPTED_FILE_PATH).subscribe(process.stdout)