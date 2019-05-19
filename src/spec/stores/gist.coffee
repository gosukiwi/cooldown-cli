{ Gist } = require_from_app('stores/gist')

describe 'Stores/Gist', ->
  describe '#toJSON', ->
    it "generates proper JSON", ->
      gist = new Gist("a description", false)
      gist.file name: "demo.rb", content: "a = 1"

      json = JSON.parse(gist.toJSON())

      expect(json.description).to.equal "a description"
      expect(json.public).to.equal false
      expect(json.files["demo.rb"].content).to.equal "a = 1"
