const {
	createReadStream,
	stat
} = require('fs')
const {
	join
} = require('path')
const {
	pipe,
	map,
	head,
	assoc,
	pick
} = require('ramda')
const {
	log
} = require('../../src/util')
const csv = require('fast-csv')
const {
	NodeStream,
	Future
} = require('../../src')

// statF :: path -> Future e Object 
const statF = Future.futurify(stat)

// fileStat :: path -> Future e Object 
const fileStat = pipe(
	(path) => statF(path).map(assoc('path', path)),
	map(pick(['path', 'size']))
)

// fileSizes :: path -> NodeStream Future e Object
const fileSizes = pipe(
	NodeStream.streamify(createReadStream),
	map(csv()),
	map(head),
	map(file => join(__dirname, '../../src', file)),
	map(fileStat)
)

// run program
fileSizes(
		join(__dirname, '../resources.txt')
	)
	.subscribe(
		(file) => file.fork(log('error:'), log('File stat ----------------->'))
	)