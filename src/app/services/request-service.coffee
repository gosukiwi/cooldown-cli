superagent = require('superagent')

exports.RequestService = class
  post: (url, credentials, params, callback) ->
    superagent
      .post(url)
      .set("User-Agent", "request")
      .auth(credentials.username, credentials.password)
      .send(params)
      .end(callback) # callback is called with (err, res)
