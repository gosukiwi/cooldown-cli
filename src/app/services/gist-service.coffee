exports.GistService = class
  constructor: (request, credentials) ->
    @request = request
    @credentials = credentials

  create: (params, callback) ->
    @request.post("https://api.github.com/gists", @credentials, params, callback)

  delete: (id, callback) ->
    @request.delete("https://api.github.com/gists/#{id}", @credentials, callback)
