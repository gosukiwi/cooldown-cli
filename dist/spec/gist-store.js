var GistStore, expect;

({expect} = require('chai'));

({GistStore} = require('../app/gist-store'));

describe('GistStore', function() {
  this.timeout(20000);
  return it("retrieves the user's gists", function(done) {
    var options, store;
    store = new GistStore("gosukiwi");
    options = {
      description: "Demo from node",
      public: false,
      files: {
        "demo.rb": {
          content: "foo = 1"
        }
      }
    };
    return store.create(options, function(err, res) {
      expect(res.status).to.equal(201);
      return done();
    });
  });
});
