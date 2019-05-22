var Compiler, RemoteCodeBlocks;

({Compiler} = require_from_app('compiler'));

({RemoteCodeBlocks} = require_from_app('transformations/remote-code-blocks'));

describe('Transformations/RemoteCodeBlocks', function() {
  return it("creates a gist from a `code_block`", function(done) {
    var compiler, dummyStore, given;
    dummyStore = {
      create: function(gist, callback) {
        gist.id = 123;
        gist.url = "http://some-fake.url";
        return callback(gist);
      }
    };
    given = "```ruby\nthis_is = \"some ruby code!\"\n```";
    compiler = new Compiler([RemoteCodeBlocks(dummyStore)]);
    return compiler.compile(given, function(result) {
      expect(result).to.equal("<script src='http://some-fake.url.js'></script>");
      return done();
    });
  });
});
