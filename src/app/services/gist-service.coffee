exports.GistService = class
  constructor: (http, credentials) ->
    @http = http
    @credentials = credentials

  create: (params, callback) ->
    @http.post("https://api.github.com/gists", @credentials, params, callback)

  delete: (id, callback) ->
    @http.delete("https://api.github.com/gists/#{id}", @credentials, callback)
