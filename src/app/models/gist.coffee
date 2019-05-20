sha1 = require('sha1')

class Gist
  constructor: (description, file, isPublic) ->
    throw new Error("Gist must have a description") if description is undefined
    throw new Error("Gist must have a file") if file is undefined
    @description = description
    @public      = isPublic or no
    @file        = file # { name: "...", content: "..." }
    @id          = null
    @url         = null

  @fromJSON: (json) ->
    json = JSON.parse(json)
    gist = new Gist(json.description, json.file, json.public)
    gist.id = json.id if json.id
    gist.url = json.url if json.url
    gist

  toHash: ->
    description: @description
    public: @public
    file: @file
    id: @id
    url: @url

  toJSON: ->
    JSON.stringify @toHash()

  cacheKey: ->
    sha1 JSON.stringify(description: @description, public: @public, file: @file)

  embedCode: ->
    throw new Error("Gist must have an URL in order to be embedded") if @url is null
    "<script src='#{@url}.js'></script>"

exports.Gist = Gist
