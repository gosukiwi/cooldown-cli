var Compiler, UseAsteriskForEmphasis;

({Compiler} = require_from_app('compiler'));

({UseAsteriskForEmphasis} = require_from_app('transformations/use-asterisk-for-emphasis'));

describe('Transformations/UseAsteriskForEmphasis', function() {
  return it("doesn't write an empty line after the heading", function(done) {
    var compiler, transformations;
    transformations = [UseAsteriskForEmphasis];
    compiler = new Compiler(transformations);
    return compiler.compile("_foo_", function(result) {
      expect(result).to.equal("*foo*");
      return done();
    });
  });
});
