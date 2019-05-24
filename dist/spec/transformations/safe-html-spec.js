var Compiler, SafeHTML;

({Compiler} = require_from_app('compiler'));

({SafeHTML} = require_from_app('transformations/safe-html'));

describe('Transformations/SafeHTML', function() {
  return it("ignores inline HTML", function(done) {
    var compiler, given, transformations;
    given = "<p>Hello, World</p>";
    transformations = [SafeHTML];
    compiler = new Compiler(transformations);
    return compiler.compile(given, function(result) {
      expect(result).to.equal("");
      return done();
    });
  });
});
