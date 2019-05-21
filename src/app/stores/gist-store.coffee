{ Gist } = require('../models/gist')
async = require('async')

# Let's not create too many gists, they can flood the users' account with
# garbage.
#
# Let's make sure that we have some kind of control over the gists so we don't
# repeat them too much, and also delete/update when possible.
#
exports.GistStore = class
  constructor: (client, storage) ->
    @client = client
    @storage = storage
    @activeGists = []

  create: (gist, done) ->
    key = gist.cacheKey()
    cached = @storage.getItem(key)

    if cached
      gist = Gist.fromJSON(cached)
      @activeGists.push(key)
      done(gist)
      return

    @client.create @options(gist), (err, res) =>
      throw err if err
      response = res.body
      gist.id  = response.id
      gist.url = response.html_url
      @storage.setItem(key, gist.toJSON())
      @activeGists.push(gist.cacheKey())
      done(gist)

  prune: (done) ->
    all = (@storage.getItem(@storage.key(i)) for i in [0..(@storage.length - 1)])
    async.each all, (val, callback) =>
      gist = Gist.fromJSON(val)
      if @isActive(gist)
        callback() # do nothing
      else
        @destroy(gist, callback)
    , (err, _result) ->
      throw err if err
      done()

  # private

  destroy: (gist, done) ->
    @client.delete gist.id, (err, res) =>
      @storage.removeItem(gist.cacheKey())
      done()

  isActive: (gist) ->
    @activeGists.indexOf(gist.cacheKey()) >= 0

  options: (gist) ->
    description: gist.description
    public: gist.public
    files:
      "#{gist.file.name}":
        content: gist.file.content
