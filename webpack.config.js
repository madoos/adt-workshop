const {
	join
} = require('path')

const DIST_DIR = join(__dirname, 'demo')

module.exports = {
	mode: 'development',
	entry: './demo/index.js',
	output: {
		filename: 'bundle.js',
		path: DIST_DIR
	},
	devServer: {
		compress: true,
		port: 8080,
		contentBase: DIST_DIR
	},
	devtool: 'source-map'
}