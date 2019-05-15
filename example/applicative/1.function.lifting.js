const {
	lift,
	pipe,
	map,
	prop
} = require('ramda')
const {
	Identity,
	Maybe,
	List,
	IO,
	Future,
	Stream,
	util
} = require('../../src')
const {
	log
} = util
const {
	stat,
	statSync
} = require('fs')

const FILE_1 = `${__dirname}/1.function.lifting.js`
const FILE_2 = `${__dirname}/2.multidimensional.loops.js`

// sizeInMB :: Object -> Number
const sizeInMB = pipe(prop('size'), (size) => size / 1000000.0)

// fileSizeIO :: path -> IO Number
const fileSizeIO = pipe(
	IO.iofy(statSync),
	map(sizeInMB)
)

// fileSizeF :: path -> Future e Number
const fileSizeF = pipe(
	Future.futurify(stat),
	map(sizeInMB)
)

// fileSizeS :: path -> Stream Number
const fileSizeS = pipe(
	Stream.streamify(stat),
	map(sizeInMB)
)

const add = lift((a) => (b) => a + b)

log(
	"addContexts for Identity:", {
		"add Identity": add(Identity.of(1), Identity.of(1)),
		"add Maybe": add(Maybe.of(1), Maybe.of(1)),
		"add Maybe with null": add(Maybe.of(1), Maybe.of(null)),
		"add List": add(List([1, 10]), List([1, 2])),
	}
)

log(
	"IO result",
	add(
		fileSizeIO(FILE_1),
		fileSizeIO(FILE_2)
	).unsafePerformIO()
)

add(
	fileSizeF(FILE_1),
	fileSizeF(FILE_2)
).fork(log('error:'), log('Future result:'))

add(
	fileSizeS(FILE_1),
	fileSizeS(FILE_2)
).subscribe(log('Stream result:'))