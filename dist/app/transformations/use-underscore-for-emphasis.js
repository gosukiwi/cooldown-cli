exports.UseUnderscoreForEmphasis = {
  emph: {
    enter: function(node, done) {
      this.put("_");
      return done();
    },
    leave: function(node, done) {
      this.put("_");
      return done();
    }
  }
};
