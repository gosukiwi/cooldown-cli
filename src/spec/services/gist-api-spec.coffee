# { GistAPI } = require_from_app('services/gist-api')
#
# describe 'Services/Gist/GistAPI', ->
#   @timeout 20000
#
#   it "creates a new gist", (done) ->
#     client = new GistAPI(username: "gosukiwi", password: process.env.GITHUB_TOKEN)
#     options =
#       description: "Demo from node",
#       public: false,
#       files:
#         "demo.rb":
#           content: "from_spec = 1"
#
#     client.create options, (err, res) ->
#       expect(res.status).to.equal(201)
#       done()