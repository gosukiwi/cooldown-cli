var GistService, request;

({GistService} = require_from_app('services/gist-service'));

request = {
  post: function(url, credentials, params, callback) {
    return callback(null, {
      status: 201
    });
  }
};

describe('Services/Gist/GistService', function() {
  return it("creates a new gist", function(done) {
    var client, credentials, params;
    credentials = {
      username: "gosukiwi",
      password: process.env.GITHUB_TOKEN
    };
    client = new GistService(request, credentials);
    params = {
      description: "Demo from node",
      public: false,
      files: {
        "demo.rb": {
          content: "from_spec = 1"
        }
      }
    };
    return client.create(params, function(err, res) {
      if (err) {
        throw err;
      }
      expect(res.status).to.equal(201);
      return done();
    });
  });
});
