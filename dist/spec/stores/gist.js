var Gist;

({Gist} = require_from_app('stores/gist'));

describe('Stores/Gist', function() {
  return describe('#toJSON', function() {
    return it("generates proper JSON", function() {
      var gist, json;
      gist = new Gist("a description", false);
      gist.file({
        name: "demo.rb",
        content: "a = 1"
      });
      json = JSON.parse(gist.toJSON());
      expect(json.description).to.equal("a description");
      expect(json.public).to.equal(false);
      return expect(json.files["demo.rb"].content).to.equal("a = 1");
    });
  });
});
