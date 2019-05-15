const {
	pipe,
	replace,
	map,
	includes,
	reject,
	split,
	reduce,
	assocPath
} = require('ramda')

const readDir = require('recursive-readdir-sync')

const requireAll = pipe(
	readDir,
	reject(includes('test')),
	map(
		pipe(
			replace(`${__dirname}`, ''),
			replace('/', ''),
			replace('.js', '')
		),
	),
	map((path) => [path, require(`${__dirname}/${path}`)]),
	reduce((acc, [name, module]) => assocPath(split('/', name), module, acc), {})
)

module.exports = requireAll(__dirname)