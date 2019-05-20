exports.NoSoftBreak = {
  softbreak: {
    enter: function(node, done) {
      this.put(" ");
      return done();
    }
  }
};
