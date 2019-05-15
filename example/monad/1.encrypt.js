const {
	join
} = require('path')
const {
	pipe,
	head,
	map,
	chain,
} = require('ramda')
const {
	log,
	secret
} = require('../../src/util')
const {
	createReadStream,
	createWriteStream
} = require('fs')
const {
	createCipher
} = require('crypto');
const csv = require('fast-csv')
const NodeStream = require('../../src/NodeStream')

// readFileStream :: path -> NodeStream
const readFileStream = NodeStream.streamify(createReadStream)

// encryptResources :: path -> NodeStream
const encryptResources = pipe(
	readFileStream,
	map(csv()),
	map(head),
	map(file => join(__dirname, '../../src', file)),
	chain(readFileStream),
	map(createCipher(secret.algorithm, secret.password))
)

// run program
encryptResources(
		join(__dirname, '../resources.txt')
	)
	.subscribe(
		createWriteStream(`${__dirname}/encrypted.txt`),
		log('error'),
		() => log('Wrote:', 'encrypted file!')
	)