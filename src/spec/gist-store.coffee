# { expect } = require('chai')
# { GistStore } = require('../app/gist-store')
#
# describe 'GistStore', ->
#   @timeout 20000
#
#   it "retrieves the user's gists", (done) ->
#     store = new GistStore("gosukiwi")
#     options =
#       description: "Demo from node",
#       public: false,
#       files:
#         "demo.rb":
#           content: "foo = 1"
#
#     store.create options, (err, res) ->
#       expect(res.status).to.equal(201)
#       done()
