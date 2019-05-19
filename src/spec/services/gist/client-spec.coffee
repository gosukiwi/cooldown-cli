{ Client } = require_from_app('services/gist/client')
{ Credentials } = require_from_app('services/gist/credentials')

describe 'Client', ->
  it "creates a new gist", (done) ->
    credentials = new Credentials("gosukiwi", process.env.GITHUB_TOKEN)
    client = new Client(credentials)
    options =
      description: "Demo from node",
      public: false,
      files:
        "demo.rb":
          content: "from_spec = 1"

    client.create options, (err, res) ->
      expect(res.status).to.equal(201)
      done()
