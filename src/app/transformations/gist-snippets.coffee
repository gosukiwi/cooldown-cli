#{ GistsStore } = require("../stores/gists-store")
sha1 = require('sha1')

store =
  create: ->
    true

commonLanguageExtensions =
  actionscript3: 'as'
  clojure: 'clj'
  coffeescript: 'coffee'
  csharp: 'cs'
  bash: 'sh'
  javascript: 'js'
  typescript: 'ts'
  markdown: 'md'
  python: 'py'
  ruby: 'rb'

exports.GistSnippets =
  code_block:
    enter: (node) ->
      info_words = if node.info then node.info.split(/\s+/) else []
      language   = info_words[0]
      extension  = commonLanguageExtensions?[language] or language
      sha1       = sha1(node.literal)
      options    =
        description: "Demo from node",
        public: false,
        files:
          "snippet-#{sha1}.#{extension}":
            content: node.literal

      store.create options, (err, res) ->
        console.log "GIST:", res
