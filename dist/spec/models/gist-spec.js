var Gist;

({Gist} = require_from_app('models/gist'));

describe('Stores/Gist', function() {
  return describe('#toJSON', function() {
    return it("generates proper JSON", function() {
      var file, gist, json;
      file = {
        name: "demo.rb",
        content: "a = 1"
      };
      gist = new Gist("a description", file, false);
      json = JSON.parse(gist.toJSON());
      expect(json.description).to.equal("a description");
      expect(json.public).to.equal(false);
      return expect(json.files["demo.rb"].content).to.equal("a = 1");
    });
  });
});