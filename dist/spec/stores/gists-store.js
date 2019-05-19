var GistsStore;

({GistsStore} = require_from_app('stores/gists-store'));

describe('Stores/GistsStore', function() {
  return describe('#create', function() {
    return it("calls store#create", function() {
      var client, store, wasCalled;
      wasCalled = false;
      client = {
        create: function() {
          return wasCalled = true;
        }
      };
      store = new GistsStore(client);
      store.create();
      return expect(wasCalled).to.equal(true);
    });
  });
});
