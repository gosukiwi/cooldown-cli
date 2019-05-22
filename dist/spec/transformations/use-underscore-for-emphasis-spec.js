var Compiler, UseUnderscoreForEmphasis;

({Compiler} = require_from_app('compiler'));

({UseUnderscoreForEmphasis} = require_from_app('transformations/use-underscore-for-emphasis'));

describe('Transformations/UseUnderscoreForEmphasis', function() {
  return it("uses underscore for emphasis", function(done) {
    var compiler, transformations;
    transformations = [UseUnderscoreForEmphasis];
    compiler = new Compiler(transformations);
    return compiler.compile("*foo*", function(result) {
      expect(result).to.equal("_foo_");
      return done();
    });
  });
});
