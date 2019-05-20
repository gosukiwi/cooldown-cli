var Gist, extensions;

({Gist} = require("../models/gist"));

extensions = {
  actionscript3: 'as',
  clojure: 'clj',
  coffeescript: 'coffee',
  csharp: 'cs',
  bash: 'sh',
  javascript: 'js',
  typescript: 'ts',
  markdown: 'md',
  python: 'py',
  ruby: 'rb',
  text: 'txt'
};

exports.RemoteCodeBlocks = function(store) {
  return {
    code_block: {
      enter: function(node, done) {
        var extension, gist, language, ref, ref1;
        language = (node != null ? (ref = node.info) != null ? (ref1 = ref.split(/\s+/)) != null ? ref1[0] : void 0 : void 0 : void 0) || "text";
        extension = (extensions != null ? extensions[language] : void 0) || language;
        gist = new Gist("created with cooldown", {
          name: `snippet.${extension}`,
          content: node.literal
        });
        return store.create(gist, (gist) => {
          this.put(gist.embedCode());
          this.put("\n\n");
          return done();
        });
      }
    }
  };
};

// TODO: This should be run after all the markdown files have been compiled,
// for general cleanup.
// finally: ->
//   GistStore.prune()
