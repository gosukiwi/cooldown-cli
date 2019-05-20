{ Gist } = require_from_app('models/gist')

describe 'Models/Gist', ->
  describe '#toJSON', ->
    it "generates proper JSON", ->
      file =
        name: "demo.rb"
        content: "a = 1"
      gist = new Gist("a description", file, false)
      gist.id = 2
      gist.url = "http://some.url"

      json = JSON.parse(gist.toJSON())

      expect(json.description).to.equal "a description"
      expect(json.public).to.equal false
      expect(json.file.name).to.equal "demo.rb"
      expect(json.file.content).to.equal "a = 1"
      expect(json.id).to.equal 2
      expect(json.url).to.equal "http://some.url"

  describe '#fromJSON', ->
    it "generates proper JSON", ->
      gist = Gist.fromJSON """
      {
        "description": "a description",
        "public": false,
        "file": {
          "name": "demo.rb",
          "content": "a = 1"
        },
        "id": 2,
        "url": "http://some.url"
      }
      """

      expect(gist.description).to.equal "a description"
      expect(gist.public).to.equal false
      expect(gist.file.name).to.equal "demo.rb"
      expect(gist.file.content).to.equal "a = 1"
      expect(gist.id).to.equal 2
      expect(gist.url).to.equal "http://some.url"
