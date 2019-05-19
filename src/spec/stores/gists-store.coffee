{ GistsStore } = require_from_app('stores/gists-store')

describe 'Stores/GistsStore', ->
  describe '#create', ->
    it "calls store#create", ->
      wasCalled = no
      client =
        create: ->
          wasCalled = yes

      store = new GistsStore(client)
      store.create()

      expect(wasCalled).to.equal(yes)
