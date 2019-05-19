var Client, Credentials;

({Client} = require_from_app('services/gist/client'));

({Credentials} = require_from_app('services/gist/credentials'));

describe('Services/Gist/Client', function() {
  this.timeout(20000);
  return it("creates a new gist", function(done) {
    var client, credentials, options;
    credentials = new Credentials("gosukiwi", process.env.GITHUB_TOKEN);
    client = new Client(credentials);
    options = {
      description: "Demo from node",
      public: false,
      files: {
        "demo.rb": {
          content: "from_spec = 1"
        }
      }
    };
    return client.create(options, function(err, res) {
      expect(res.status).to.equal(201);
      return done();
    });
  });
});
