{ ERROR_CODES } = require('./error-codes')
{ Compiler } = require('./compiler')
fs = require('fs')
path = require('path')
glob = require('glob')

exports.Application = class
  constructor: (input, output, compiler) ->
    throw new Error(ERROR_CODES.INVALID_INPUT) unless input
    @glob     = input
    @output   = output
    @compiler = compiler

  run: ->
    glob @glob, {}, (err, files) =>
      throw err if err
      @process(file) for file in files

  # private

  process: (file) ->
    fs.readFile file, 'utf8', (err, data) =>
      throw err if err
      @writeFile baseFile: file, newFileContent: @compile(data)

  writeFile: (options) ->
    baseFile = options.baseFile
    newFileContent = options.newFileContent

    fs.mkdir @output, recursive: true, (_error) =>
      # Ignore `_error`. If there is an error, the output directory is already
      # created.
      outputFilePath = path.join @output, path.basename(baseFile)
      fs.writeFile outputFilePath, newFileContent, (err) =>
        throw err if err

  compile: (input) ->
    @compiler.compile input
