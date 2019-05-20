{ GistsStore } = require_from_app('stores/gists-store')
{ Gist } = require_from_app('models/gist')

class MemoryStorage
  constructor: ->
    @storage = {}

  getItem: (key) ->
    @storage[key] or null

  setItem: (key, value) ->
    @storage[key] = value

describe 'Stores/GistsStore', ->
  describe '#create', ->
    it "sets the ID and URL", (done) ->
      gist = new Gist('some desc', name: "some-file.rb", content: "foo = 'bar'")
      client =
        create: (_params, callback) ->
          callback(null, body: { id: 1, html_url: "foo" })
      store = new GistsStore(client, new MemoryStorage())

      store.create gist, (gist) ->
        expect(gist.id).to.equal(1)
        expect(gist.url).to.equal("foo")
        done()

    it "does not create the same gist twice", (done) ->
      timesCalled = 0
      client =
        create: (_params, callback) ->
          timesCalled += 1
          callback(null, body: { id: 1, html_url: "foo" })

      store = new GistsStore(client, new MemoryStorage())
      gist  = new Gist('some desc', name: "some-file.rb", content: "foo = 'bar'")

      store.create gist, (gist) ->
        store.create gist, ->
          expect(timesCalled).to.equal(1)
          done()
