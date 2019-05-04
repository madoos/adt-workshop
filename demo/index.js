import {
	pipe,
	pipeP,
	propOr,
	invoker,
	split,
	join,
	map,
	path,
	curry,
	propEq,
	when,
	always
} from 'ramda'
import {
	html,
	render
} from 'lit-html';
import Future from '../src/Future'
import Stream from '../src/Stream'
import IO from '../src/IO'
import Maybe from '../src/Maybe'

// getDomElement :: String -> IO Dom
const getDomElement = IO.iofy((id) => document.getElementById(id))

// toJSON :: Response -> Promise e {}
const toJSON = invoker(0, 'json')

// httpGet :: url -> Future e a
const httpGet = Future.futurifyP(pipeP(fetch, toJSON))

// ################## AUTOCOMPLETE FROM WIKIPEDIA ##################

// wikipediaSearch :: String -> Future e [String]
const wikipediaSearch = pipe(
	(term) => `https://en.wikipedia.org/w/api.php?action=opensearch&format=json&formatversion=2&search=${term}&namespace=0&limit=10&suggest=true&origin=*`,
	httpGet,
	map(propOr([], '1'))
)

// createDomList :: [String] -> TemplateElement
const createDomList = map((movie) => html `<li data-movie=${movie} >${movie}</li>`)

// autocompleteMovies :: String -> IO Stream Future e TemplateElement
const autocompleteMoviesFrom = pipe(
	getDomElement,
	map(Stream.fromDomEvent('keyup')),
	map(map(path(['target', 'value']))),
	map(map(wikipediaSearch)),
	map(map(map(createDomList)))
)

// ################## SEARCH MOVIE FROM OMDB ##################

// searchOMDBMovie :: String -> Future e null | {}
const searchOMDBMovie = pipe(
	pipe(split(" "), join("+")),
	(query) => `https://www.omdbapi.com/?t=${query}&apikey=7a4cc1c2`,
	httpGet,
	map(when(propEq('Response', 'False'), always(null)))
)

// createDomMovie :: { Title, Year } -> TemplateElement
const createDomMovie = ({
	Title,
	Year,
	Poster,
	Plot
}) => html `
	<div class="movie-template">
		<img src=${Poster} alt=${Title} />
		<h4>
			${Title} ${Year}
		</h4>
		<div>
			<p>${Plot}</p>
		</div>
	</div>
`
// safeCreateDomMovie :: {} | null -> Maybe TemplateElement
const safeCreateDomMovie = pipe(
	Maybe.of,
	map(createDomMovie)
)

// searchMovieFromClick :: String -> IO Stream Future e Maybe TemplateElement
const searchMovieFromClick = pipe(
	getDomElement,
	map(Stream.fromDomEvent('click')),
	map(map(path(['target', 'dataset', 'movie']))),
	map(map(searchOMDBMovie)),
	map(map(map(safeCreateDomMovie))),
)

// ################## UTILS ##################

const runIo = invoker(0, 'unsafePerformIO')
const runStream = invoker(1, 'subscribe')
const runFuture = invoker(2, 'fork')
const log = curry((tag, data) => console.log(tag, data))
const renderInto = curry((id, template) => render(template, document.getElementById(id)))

// ################## IMPURE ##################

const renderAutoCompletion = runFuture(log('autocompletion error'), renderInto('movies'))
const renderAutocompletionFromInput = pipe(autocompleteMoviesFrom, runIo, runStream(renderAutoCompletion))
const safeRenderMovie = runFuture(log('movie Error'), map(renderInto('movie')))
const safeRenderMovieFromClickOn = pipe(searchMovieFromClick, runIo, runStream(safeRenderMovie))

// ################## PROGRAM ##################

renderAutocompletionFromInput('search')
safeRenderMovieFromClickOn('movies')