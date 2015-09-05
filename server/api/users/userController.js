var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var request = require('request');

module.exports = {

  /**
   * signup() Signs a user up.
   *
   * @param {Object} the request object sent from the client
   * @param {Object} the response object
   * @param {Function} the next function
   * @return {Object} the created user
   */
  signup: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var slackOrganization = req.body.slackOrganization;
    var newUser;

    User.findOne({username: username}, function(error, user) {
      if (error) {
        res.status(500).send({data: 'There was an error...'});
        return;
      }

      if (user) {
        res.status(400).send({data: 'A user already exists...'});
        return;
      }

      var newUser = new User({
        username: username,
        password: password,
        slackOrganization: slackOrganization
      });

      newUser.save(function(error) {
        if (error) {
          res.status(500).send({data: 'There was an error...'});
          return;
        }

        var token = jwt.encode(newUser, 'secret');

        var data = {
          username: newUser.username,
          slackOrganization: newUser.slackOrganization,
          botKey: newUser.botKey,
          botModules: newUser.botModules,
          token: token
        };

        res.status(201).send(data);

        return;
      });

    });
  },

  /**
   * login() Logs a user in.
   *
   * @param {Object} the request object sent from the client
   * @param {Object} the response object
   * @param {Function} the next function
   * @return {Object} returns user data on success, error on fail
   */
  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function(error, user) {
      if (error) {
        res.status(500).send({ message: 'There was an error...' });
        return;
      }

      if (!user) {
        res.status(400).send({data: 'Invalid creds...'});
        return;
      } else {
        user.comparePasswords(password)
          .then(function(foundUser) {
            if (foundUser) {
              var token = jwt.encode(user, 'secret');
              var data = {
                username: user.username,
                slackOrganization: user.slackOrganization,
                botKey: user.botKey,
                botModules: user.botModules,
                token: token
              };
              res.status(201).send(data);
              return;
            } else {
              res.status(400).send({data: 'No user'});
              return;
            }
          });
      }
    });
  },

  /**
   * update()
   *
   * @param {Object} the request object sent from the client
   * @param {Object} the response object
   * @param {Function} the next function
   */
  update: function(req, res, next) {
    var username = req.body.username;
    var data = req.body.data;
    var findUser = Q.nbind(User.findOne, User);

    findUser({username: username})
      .then(function(user) {
        user.update(data, function(err, raw) {
          user.save(function(error) {
            var data = {
              username: user.username,
              slackOrganization: user.slackOrganization,
              botKey: user.botKey,
              botModules: user.botModules
            };
            user.emitUpdate(username);
            res.status(201).send(data);
            return;
          });
        });
      });

  },

  /**
   * getAuthUser() Gets the currently authenticated user.
   *
   * @param {Object} the request object sent from the client
   * @param {Object} the response object
   * @param {Function} the next function
   * @return {Object} the user data on success, and an error on fail
   */
  getAuthUser: function(req, res, next) {
    var username = req.body.username;
    var findOne = Q.nbind(User.findOne, User);

    findOne({username: username})
      .then(function(user) {
        var data = {
          username: user.username,
          slackOrganization: user.slackOrganization,
          botKey: user.botKey,
          botModules: user.botModules
        };
        res.send(data);
      })
      .fail(function(error) {
        next(error);
      });
  },

  getAvailableModules: function(req, res, next) {
    var apiRoute = 'http://localhost:3000/api/ferd/modules'; // get from env variable
    request.get(apiRoute, function(err, data) {
      res.send(data);
    });
  }

};
