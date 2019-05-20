var Gist;

({Gist} = require_from_app('models/gist'));

describe('Models/Gist', function() {
  describe('#toJSON', function() {
    return it("generates proper JSON", function() {
      var file, gist, json;
      file = {
        name: "demo.rb",
        content: "a = 1"
      };
      gist = new Gist("a description", file, false);
      gist.id = 2;
      gist.url = "http://some.url";
      json = JSON.parse(gist.toJSON());
      expect(json.description).to.equal("a description");
      expect(json.public).to.equal(false);
      expect(json.file.name).to.equal("demo.rb");
      expect(json.file.content).to.equal("a = 1");
      expect(json.id).to.equal(2);
      return expect(json.url).to.equal("http://some.url");
    });
  });
  return describe('#fromJSON', function() {
    return it("generates proper JSON", function() {
      var gist;
      gist = Gist.fromJSON("{\n  \"description\": \"a description\",\n  \"public\": false,\n  \"file\": {\n    \"name\": \"demo.rb\",\n    \"content\": \"a = 1\"\n  },\n  \"id\": 2,\n  \"url\": \"http://some.url\"\n}");
      expect(gist.description).to.equal("a description");
      expect(gist.public).to.equal(false);
      expect(gist.file.name).to.equal("demo.rb");
      expect(gist.file.content).to.equal("a = 1");
      expect(gist.id).to.equal(2);
      return expect(gist.url).to.equal("http://some.url");
    });
  });
});
