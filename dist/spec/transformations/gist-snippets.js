var Compiler, GistSnippets;

({Compiler} = require_from_app('compiler'));

({GistSnippets} = require_from_app('transformations/gist-snippets'));

describe('Transformations/GistSnippets', function() {
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
    compiler = new Compiler([GistSnippets(dummyStore)]);
    return compiler.compile(given, function(result) {
      expect(result).to.equal("<script src='http://some-fake.url.js'></script>\n\n");
      return done();
    });
  });
});
