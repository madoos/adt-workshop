const {
  readdirSync
} = require('fs')

// Dynamically loads each function implemented
module.exports = readdirSync(__dirname)
  .filter(file => file !== 'index.js' && !file.includes('.test.js'))
  .map((file) => file.replace('.js', ''))
  .reduce((lib, file) => ({
    ...lib,
    [file]: require(`./${file}`)
  }), {})