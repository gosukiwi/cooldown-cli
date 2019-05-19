{ GistsStore } = require_from_app('stores/gists-store')
{ Gist } = require_from_app('models/gist')

class MemoryStorage
  constructor: ->
    @store = {}

  getItem: (key) ->
    @store[key]

  setItem: (key, value) ->
    @store[key] = value

describe 'Stores/GistsStore', ->
  describe '#create', ->
    it "sets the ID and URL", (done) ->
      gist   = new Gist('some desc', name: "some-file.rb", content: "foo = 'bar'")
      client =
        create: (params, callback) ->
          response =
            body:
              id: "some-id"
              html_url: "https://some.url"
          callback(null, response)
      store = new GistsStore(client, new MemoryStorage())

      store.create gist, (gist) ->
        expect(gist.id).not.to.equal(null)
        expect(gist.url).not.to.equal(null)
        done()

    it "does not create the same gist twice", ->
      timesCalled = 0
      client =
        create: (gist, callback) ->
          response =
            body:
              id: "some-id"
              html_url: "https://some.url"
          timesCalled += 1
          callback(null, response)

      store = new GistsStore(client, new MemoryStorage())
      gist  = new Gist('some desc', name: "some-file.rb", content: "foo = 'bar'")

      store.create(gist)
      store.create(gist)

      expect(timesCalled).to.equal(1)
