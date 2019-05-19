var Gist, GistsStore, MemoryStorage;

({GistsStore} = require_from_app('stores/gists-store'));

({Gist} = require_from_app('models/gist'));

MemoryStorage = class MemoryStorage {
  constructor() {
    this.store = {};
  }

  getItem(key) {
    return this.store[key];
  }

  setItem(key, value) {
    return this.store[key] = value;
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
        create: function(params, callback) {
          var response;
          response = {
            body: {
              id: "some-id",
              html_url: "https://some.url"
            }
          };
          return callback(null, response);
        }
      };
      store = new GistsStore(client, new MemoryStorage());
      return store.create(gist, function(gist) {
        expect(gist.id).not.to.equal(null);
        expect(gist.url).not.to.equal(null);
        return done();
      });
    });
    return it("does not create the same gist twice", function() {
      var client, gist, store, timesCalled;
      timesCalled = 0;
      client = {
        create: function(gist, callback) {
          var response;
          response = {
            body: {
              id: "some-id",
              html_url: "https://some.url"
            }
          };
          timesCalled += 1;
          return callback(null, response);
        }
      };
      store = new GistsStore(client, new MemoryStorage());
      gist = new Gist('some desc', {
        name: "some-file.rb",
        content: "foo = 'bar'"
      });
      store.create(gist);
      store.create(gist);
      return expect(timesCalled).to.equal(1);
    });
  });
});
