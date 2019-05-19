// Let's not create too many gists, they can flood the users' account with
// garbage.

// Let's make sure that we have some kind of control over the gists so we don't
// repeat them too much, and also delete/update when possible.

exports.GistStore = class {
  constructor(username) {}

  //@api = new Client(username)
  create(options, callback) {
    //@api.create options, callback
    return true;
  }

};
