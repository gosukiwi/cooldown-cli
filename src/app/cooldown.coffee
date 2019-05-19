glob = require('glob')
{ ERROR_CODES } = require('./error-codes')

class InputEmptyError < Error

# * Read the `cooolfile.js` file in the current dir
# * Glob folder for markdown files (from CLI)
# * Run `RendererWithTransformations` on all files matched
# * Write expected output files
exports.Cooldown = class
  constructor: (input, outputLocation) ->
    throw new Error(ERROR_CODES.INVALID_INPUT) unless input
    @glob = input
    @outputLocation = outputLocation

  run: ->
    glob @glob, {}, (er, files) ->
      console.log files
