const Identity = require('./Identity')
const Maybe = require('./Maybe')
const Either = require('./Either')
const List = require('./List')
const IO = require('./IO')
const Future = require('./Future')
const Stream = require('./Stream')
const {
	curryN,
	curry,
	is,
	last,
	init,
	map
} = require('ramda')

const isFunction = is(Function)

/*
overloadForFunctions provides two signatures, 
one for if a Function is used for the second argument and another if the source ADT is passed instead. 
Although it may seem strange, this provides some flexibility on how to apply the transformation. 
The ADT version is great for squishing an already nested type or to perform the transformation in a composition. 
While the Function version can be used to extend an existing function without having to explicitly compose it. 
*/
const overloadForFunctions = nt => {
	return curryN(nt.length, (...args) => {
		const target = last(args)
		const params = init(args)

		return isFunction(target) ?
			curryN(target.length, (...args) => {
				return nt(...params, target(...args))
			}) :
			nt(...args)
	})
}

// -- Identity

// identityToMaybe :: Identity a -> Maybe a
// identityToMaybe :: (* -> Identity a ) -> (* -> Maybe a )
const identityToMaybe = identity => identity.fold(Maybe.of)

// identityToEither :: Identity a -> Either a
// identityToEither :: (* -> Identity a ) -> (* -> Either a )
const identityToEither = identity => identity.fold(Either.Right)

// identityToList :: Identity a -> List [a]
// identityToList :: (* -> Identity a ) -> (* -> List [a] )
const identityToList = identity => identity.fold(List.of)

// identityToIO :: Identity a -> IO a
// identityToIO :: (* -> Identity a) -> (* -> IO a)
const identityToIO = identity => identity.fold(IO.of)

// identityToFuture :: Identity a -> Future a
// identityToFuture :: (* -> Identity a) -> (* -> Future a)
const identityToFuture = identity => identity.fold(Future.of)

// identityToStream :: Identity a -> Stream a
// identityToStream :: (* -> Identity a) -> (* -> Stream a)
const identityToStream = identity => identity.fold(Stream.of)

// -- Maybe

// maybeToEither :: a -> Maybe b -> Either a b
// maybeToEither :: a -> (* -> Maybe b) -> (* -> Either a b)
const maybeToEither = curry((left, maybe) => {
	const leftVal = isFunction(left) ? left() : left
	return maybe.fold(() => Either.Left(leftVal), Either.Right)
})

// maybeToList :: Maybe a -> List [] | [a]
// maybeToList :: (* -> Maybe a) -> (* -> List [] | [a])
const maybeToList = maybe => maybe.fold(List.empty, List.of)

// maybeToFuture :: b -> Maybe a -> Future b a
// maybeToFuture :: b -> (* -> Maybe a) -> (* -> Future b a)
const maybeToFuture = curry((e, maybe) => {
	const eVal = isFunction(e) ? e() : e
	return maybe.fold(() => Future.reject(eVal), Future.of)
})

// maybeToStream :: b -> Maybe a -> Stream b a
// maybeToStream :: b -> (* -> Maybe a) -> (* -> Stream b a)
const maybeToStream = curry((e, maybe) => {
	const eVal = isFunction(e) ? e() : e
	return maybe.fold(() => Stream.reject(eVal), Stream.of)
})

// -- Either

// eitherToMaybe :: Either b a -> Maybe a
// eitherToMaybe :: (* -> Either b a) ->  (* -> Maybe a)
const eitherToMaybe = either => either.fold(Maybe.Nothing, Maybe.Just)

// eitherToList :: Either b a -> List [] | [a]
// eitherToList :: (* -> Either b a) ->  (* -> List [] | [a])
const eitherToList = either => either.fold(List.empty, List.of)

// eitherToFuture :: Either b a -> Future b a
// eitherToFuture :: (* -> Either b a) -> (* -> Future b a)
const eitherToFuture = either => either.fold(Future.reject, Future.of)

// eitherToStream :: Either b a -> Stream b a
// eitherToStream :: (* -> Either b a) -> (* -> Stream b a)
const eitherToStream = either => either.fold(Stream.reject, Stream.of)

// -- List

// ListToArray :: List a -> [a]
// ListToArray :: (* -> List a) -> (* -> [a])
const listToArray = list => list.fold(arr => arr)

// - IO

// ioToFuture :: io a -> Future e a
// ioToFuture :: (* -> io a) -> (* -> Future e a)
const ioToFuture = io =>
	Future((reject, resolve) => {
		try {
			resolve(io.unsafePerformIO())
		} catch (e) {
			reject(e)
		}
	})

// ioToStream :: io a -> Stream e a
// ioToStream :: (* -> io a) -> (*-> Stream e a)
const ioToStream = io =>
	Stream(handler => {
		try {
			handler.next(io.unsafePerformIO())
		} catch (e) {
			handler.error(e)
		}
		handler.complete()
	})

// - Future

// futureToStream :: Future e a -> Stream a
// futureToStream :: (* -> Future e a) -> (* -> Stream e a)
const futureToStream = future =>
	Stream(handler => {
		future.fork(
			e => {
				handler.error(e)
				handler.complete()
			},
			data => {
				handler.next(data)
				handler.complete()
			}
		)
	})

const nt = map(overloadForFunctions, {
	identityToMaybe,
	identityToEither,
	identityToList,
	identityToIO,
	identityToFuture,
	identityToStream,
	maybeToEither,
	maybeToList,
	maybeToFuture,
	maybeToStream,
	eitherToMaybe,
	eitherToList,
	eitherToFuture,
	eitherToStream,
	listToArray,
	ioToFuture,
	ioToStream,
	futureToStream
})


module.exports = nt