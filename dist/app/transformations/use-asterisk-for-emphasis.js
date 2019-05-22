exports.UseAsteriskForEmphasis = {
  emph: {
    enter: function(node, done) {
      this.put("*");
      return done();
    },
    leave: function(node, done) {
      this.put("*");
      return done();
    }
  }
};
