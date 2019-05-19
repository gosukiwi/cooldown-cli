superagent = require('superagent')

exports.Client = class
  constructor: (credentials) ->
    @credentials = credentials

  create: (params, callback) ->
    superagent
      .post("https://api.github.com/gists")
      .set("User-Agent", "request")
      .auth(@credentials.username, @credentials.password)
      .send(params)
      .end((err, res) -> callback(err, res))
