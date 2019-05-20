{ GistService } = require_from_app('services/gist-service')

request =
  post: (url, credentials, params, callback) ->
    callback(null, status: 201)

describe 'Services/Gist/GistService', ->
  it "creates a new gist", (done) ->
    credentials = username: "gosukiwi", password: process.env.GITHUB_TOKEN
    client = new GistService(request, credentials)
    params =
      description: "Demo from node",
      public: false,
      files:
        "demo.rb":
          content: "from_spec = 1"

    client.create params, (err, res) ->
      throw err if err
      expect(res.status).to.equal(201)
      done()
