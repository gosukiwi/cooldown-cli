var Compiler, TableOfContents;

({Compiler} = require_from_app('compiler'));

({TableOfContents} = require_from_app('transformations/table-of-contents'));

describe('Transformations/TableOfContents', function() {
  return it("transforms single new lines into spaces", function(done) {
    var compiler, expected, given, transformations;
    given = "# This is a heading\nSome text.\n\n```markdown\n# This should not appear on the ToC\n```\n\n## A level 2 heading\nSome more text.\n\n# A level 1 heading again\nThis is a sentence.\n\n## A level 2 heading\nSome more text.\n\n### A level 3 heading\nSome more text.";
    expected = "# Table of Contents\n* [This is a heading](#this-is-a-heading)\n  * [A level 2 heading](#a-level-2-heading)\n* [A level 1 heading again](#a-level-1-heading-again)\n  * [A level 2 heading](#a-level-2-heading)\n    * [A level 3 heading](#a-level-3-heading)\n\n# This is a heading\nSome text.\n\n```markdown\n# This should not appear on the ToC\n```\n\n## A level 2 heading\nSome more text.\n\n# A level 1 heading again\nThis is a sentence.\n\n## A level 2 heading\nSome more text.\n\n### A level 3 heading\nSome more text.";
    transformations = [TableOfContents()];
    compiler = new Compiler(transformations);
    return compiler.compile(given, function(result) {
      expect(result).to.equal(expected);
      return done();
    });
  });
});
