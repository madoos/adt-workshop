const {
	IO,
	util
} = require('../../src')
const {
	log
} = util
const {
	readFileSync
} = require('fs')
const {
	pipe,
	chain,
	length,
	map,
	split,
	dec
} = require('ramda')

// read :: path -> IO ()
const read = IO.iofy(readFileSync)

// writeOut :: path ->  IO ()
const writeOut = IO.iofy(log('Count:'))

// countChart :: String -> String -> Number
const countChart = (chart) => pipe(split(chart), length, dec)

// countAInFile :: path -> IO ()
const countAInFile = pipe(
	read,
	map(countChart('a')),
	chain(writeOut)
)

const FILE = `${__dirname}/1.encrypt.js`

countAInFile(FILE, 'utf-8')
	.unsafePerformIO()