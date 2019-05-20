var Gist, GistsStore, MemoryStorage;

({GistsStore} = require_from_app('stores/gists-store'));

({Gist} = require_from_app('models/gist'));

MemoryStorage = class MemoryStorage {
  constructor() {
    this.storage = {};
  }

  getItem(key) {
    return this.storage[key] || null;
  }

  setItem(key, value) {
    return this.storage[key] = value;
  }

};

describe('Stores/GistsStore', function() {
  return describe('#create', function() {
    it("sets the ID and URL", function(done) {
      var client, gist, store;
      gist = new Gist('some desc', {
        name: "some-file.rb",
        content: "foo = 'bar'"
      });
      client = {
        create: function(_params, callback) {
          return callback(null, {
            body: {
              id: 1,
              html_url: "foo"
            }
          });
        }
      };
      store = new GistsStore(client, new MemoryStorage());
      return store.create(gist, function(gist) {
        expect(gist.id).to.equal(1);
        expect(gist.url).to.equal("foo");
        return done();
      });
    });
    return it("does not create the same gist twice", function(done) {
      var client, gist, store, timesCalled;
      timesCalled = 0;
      client = {
        create: function(_params, callback) {
          timesCalled += 1;
          return callback(null, {
            body: {
              id: 1,
              html_url: "foo"
            }
          });
        }
      };
      store = new GistsStore(client, new MemoryStorage());
      gist = new Gist('some desc', {
        name: "some-file.rb",
        content: "foo = 'bar'"
      });
      return store.create(gist, function(gist) {
        return store.create(gist, function() {
          expect(timesCalled).to.equal(1);
          return done();
        });
      });
    });
  });
});
