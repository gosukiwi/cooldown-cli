exports.SafeHTML = {
  html_inline: {
    enter: function(_node, done) {
      // Do not output HTML inlines
      return done();
    }
  },
  html_block: {
    enter: function(_node, done) {
      // Do not output HTML blocks
      return done();
    }
  }
};
