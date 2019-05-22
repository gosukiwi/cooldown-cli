exports.UseUnderscoreForStrong = {
  strong: {
    enter: function(node, done) {
      this.put("__");
      return done();
    },
    leave: function(node, done) {
      this.put("__");
      return done();
    }
  }
};
