sha1 = require('sha1')

exports.Gist = class
  constructor: (description, isPublic) ->
    raise new Error("Gist must have a description") if description is undefined
    @description = description
    @public      = isPublic or no
    @files       = []

  # file looks like this: `{ name: name, content: content }`
  file: (file) ->
    @files.push file
    this

  toHash: ->
    raise new Error("Gist must have files") if @files.length is 0

    hash =
      description: @description
      public: @public
      files: {}

    for file in @files
      hash.files[file.name] =
        content: file.content

    hash

  toJSON: ->
    JSON.stringify @toHash()

  cacheKey: ->
    sha1 @toJSON()
