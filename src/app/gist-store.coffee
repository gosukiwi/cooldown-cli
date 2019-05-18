superagent = require('superagent')
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
