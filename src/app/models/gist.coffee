sha1 = require('sha1')

exports.Gist = class
  constructor: (description, file, isPublic) ->
    throw new Error("Gist must have a description") if description is undefined
    throw new Error("Gist must have a file") if file is undefined
    @description = description
    @public      = isPublic or no
    @file        = file # { name: "...", content: "..." }
    @id          = null
    @url         = null

  toHash: ->
    description: @description
    public: @public
    files:
      "#{@file.name}":
        content: @file.content

  toJSON: ->
    JSON.stringify @toHash()

  cacheKey: ->
    sha1 @toJSON()

  embedCode: ->
    throw new Error("Gist must have an URL in order to be embedded") if @url is null
    "<script src='#{@url}.js'></script>"
