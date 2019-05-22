exports.UseAsteriskForStrong = {
  strong: {
    enter: function(node, done) {
      this.put("**");
      return done();
    },
    leave: function(node, done) {
      this.put("**");
      return done();
    }
  }
};
