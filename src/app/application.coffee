{ InvalidInputError } = require('./errors')
fs = require('fs')
path = require('path')
glob = require('glob')
async = require("async")

exports.Application = class
  constructor: (input, output, compiler) ->
    throw new InvalidInputError unless input
    @glob     = input
    @output   = output
    @compiler = compiler

  run: (done) ->
    @mkdir()
    glob @glob, {}, (err, files) =>
      throw err if err
      async.each files, (file, _done) =>
        @process(file, _done)
      , (err) =>
        throw err if err
        done()

  # private

  process: (file, _done) ->
    data = fs.readFileSync(file, 'utf8')
    @compile data, (content) =>
      @write baseFile: file, newFileContent: content
      _done()

  write: (options) ->
    baseFile = options.baseFile
    newFileContent = options.newFileContent
    fs.writeFileSync path.join(@output, path.basename(baseFile)), newFileContent

  mkdir: ->
    try
      fs.mkdirSync @output, recursive: true
    catch
      # I don't care

  compile: (input, done) ->
    @compiler.compile input, done
