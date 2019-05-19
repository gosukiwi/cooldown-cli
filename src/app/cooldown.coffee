fs = require('fs')
glob = require('glob')
{ ERROR_CODES } = require('./error-codes')

# * Read the `cooolfile.js` file in the current dir
# * Glob folder for markdown files (from CLI)
# * Run `RendererWithTransformations` on all files matched
# * Write expected output files
exports.Cooldown = class
  constructor: (input, output) ->
    throw new Error(ERROR_CODES.INVALID_INPUT) unless input
    @glob = input
    @output = output

  run: ->
    glob @glob, {}, (err, files) =>
      throw err if err
      @readFile(file) for file in files

  readFile: (file) ->
    fs.readFile file, 'utf8', (err, data) =>
      throw err if err
      console.log data
