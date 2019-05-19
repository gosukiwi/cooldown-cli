superagent = require('superagent')

# Let's not create too many gists, they can flood the users' account with
# garbage.
#
# Let's make sure that we have some kind of control over the gists so we don't
# repeat them too much, and also delete/update when possible.
#
exports.GistStore = class
  constructor: (username) ->
    @api = new GistAPI(username)

  create: (options, callback) ->
    @api.create options, callback

class GistAPI
  constructor: (username) ->
    @username = username
    @token = process.env.GITHUB_TOKEN

  create: (params, callback) ->
    superagent
      .post("https://api.github.com/gists")
      .set("User-Agent", "request")
      .auth(@username, @token)
      .send(params)
      .end((err, res) -> callback(err, res))
