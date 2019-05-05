const {
	createReadStream,
	createWriteStream
} = require('fs')
const {
	createCipher
} = require('crypto');
const {
	join
} = require('path')
const {
	pipe,
	concat,
	head,
	map,
	chain,
	invoker
} = require('ramda')
const {
	log,
	secret
} = require('./utils')

const csv = require('fast-csv')
const WrapStream = require('../src/WrapStream')
const readFileStream = WrapStream.streamify(createReadStream)
const runWrapStream = invoker(3, 'subscribe')

const LIST_FILE_PATH = `${__dirname}/files.txt`
const SRC_PATH = join(__dirname, '../src/')
const ENCRYPTED_FILE_PATH = `${__dirname}/encrypted.txt`

const writeFileWith = runWrapStream(
	createWriteStream(ENCRYPTED_FILE_PATH),
	log('error'),
	() => log('Wrote: ', 'encrypted file!')
)

// encryptFiles :: path -> WrapStream
const encryptFile = pipe(
	readFileStream,
	map(csv()),
	map(head),
	map(concat(SRC_PATH)),
	chain(readFileStream),
	map(createCipher(secret.algorithm, secret.password)),
)

// run program
writeFileWith(encryptFile(LIST_FILE_PATH))