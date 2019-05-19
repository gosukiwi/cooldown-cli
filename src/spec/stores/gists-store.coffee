{ GistsStore } = require_from_app('stores/gists-store')
{ Gist } = require_from_app('stores/gist')

class MemoryStorage
  constructor: ->
    @store = {}

  getItem: (key) ->
    @store[key]

  setItem: (key, value) ->
    @store[key] = value

describe 'Stores/GistsStore', ->
  describe '#create', ->
    it "calls store#create", ->
      wasCalled = no
      client =
        create: ->
          wasCalled = yes
      store = new GistsStore(client, new MemoryStorage())
      gist = new Gist('some desc').file(name: "some-file.rb", content: "foo = 'bar'")

      store.create(gist)

      expect(wasCalled).to.equal(yes)

    it "does not create the same code twice", ->
      timesCalled = 0
      client =
        create: ->
          timesCalled += 1
      store = new GistsStore(client, new MemoryStorage())
      gist = new Gist('some desc').file(name: "some-file.rb", content: "foo = 'bar'")

      store.create(gist)
      store.create(gist)

      expect(timesCalled).to.equal(1)
