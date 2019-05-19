var Gist, GistsStore, MemoryStorage;

({GistsStore} = require_from_app('stores/gists-store'));

({Gist} = require_from_app('stores/gist'));

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
    it("calls store#create", function() {
      var client, gist, store, wasCalled;
      wasCalled = false;
      client = {
        create: function() {
          return wasCalled = true;
        }
      };
      store = new GistsStore(client, new MemoryStorage());
      gist = new Gist('some desc').file({
        name: "some-file.rb",
        content: "foo = 'bar'"
      });
      store.create(gist);
      return expect(wasCalled).to.equal(true);
    });
    return it("does not create the same code twice", function() {
      var client, gist, store, timesCalled;
      timesCalled = 0;
      client = {
        create: function() {
          return timesCalled += 1;
        }
      };
      store = new GistsStore(client, new MemoryStorage());
      gist = new Gist('some desc').file({
        name: "some-file.rb",
        content: "foo = 'bar'"
      });
      store.create(gist);
      store.create(gist);
      return expect(timesCalled).to.equal(1);
    });
  });
});
