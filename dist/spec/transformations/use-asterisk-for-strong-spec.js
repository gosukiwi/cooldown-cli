var Compiler, UseAsteriskForStrong;

({Compiler} = require_from_app('compiler'));

({UseAsteriskForStrong} = require_from_app('transformations/use-asterisk-for-strong'));

describe('Transformations/UseAsteriskForStrong', function() {
  return it("doesn't write an empty line after the heading", function(done) {
    var compiler, transformations;
    transformations = [UseAsteriskForStrong];
    compiler = new Compiler(transformations);
    return compiler.compile("__foo__", function(result) {
      expect(result).to.equal("**foo**");
      return done();
    });
  });
});
