{ Gist } = require('../models/gist')

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

  create: (gist, done) ->
    key = gist.cacheKey()
    cached = @storage.getItem(key)

    return done(Gist.fromJSON(cached)) if cached

    @client.create @options(gist), (err, res) =>
      throw err if err
      response = res.body
      gist.id  = response.id
      gist.url = response.html_url
      @storage.setItem(key, gist.toJSON())
      done(gist)

  # private

  options: (gist) ->
    description: gist.description
    public: gist.public
    files:
      "#{gist.file.name}":
        content: gist.file.content
