{ Gist } = require_from_app('stores/gist')

describe 'Stores/Gist', ->
  describe '#toJSON', ->
    it "generates proper JSON", ->
      file =
        name: "demo.rb"
        content: "a = 1"
      gist = new Gist("a description", file, false)

      json = JSON.parse(gist.toJSON())

      expect(json.description).to.equal "a description"
      expect(json.public).to.equal false
      expect(json.files["demo.rb"].content).to.equal "a = 1"
