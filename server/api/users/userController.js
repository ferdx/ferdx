var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

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
    var create;
    var newUser;

    var findOne = Q.nbind(User.findOne, User);

    findOne( {username: username} )
      .then(function(user) {
        if (user) {
          res.status(401).send({data: 'User already exists!'});
        } else {
          create = Q.nbind(User.create, User);
          newUser = {
            username: username,
            slackOrganization: slackOrganization,
            password: password
          };

          return create(newUser);
        }
      })
      .then(function(user) {
        if (user) {
          user.save(function() {
            var token = jwt.encode(user, 'secret');
            var data = {
              username: user.username,
              slackOrganization: user.slackOrganization,
              botKey: user.botKey,
              botModules: user.botModules,
              token: token
            };
            res.status(201).send(data);
          });
        }
      })
      .fail(function(error) {
        next(error);
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

    var findUser = Q.nbind(User.findOne, User);

    findUser({username: username})
      .then(function(user) {
        if (!user) {
          res.status(401).send({data: 'User does not exist'});
        } else {
          return user.comparePasswords(password)
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
              } else {
                res.status(401).send({data: 'No user'});
              }
            });
        }
      })
      .fail(function(error) {
        next(error);
      });
  },

  /**
   * logout() Logs a user out. Returns nothing.
   *
   * @param {Object} the request object sent from the client
   * @param {Object} the response object
   * @param {Function} the next function
   */
  logout: function(req, res, next){
    var username = req.body.username;
    var findUser = Q.nbind(User.findOne, User);

    findUser({username: username})
      .then(function(user) {
        res.status(201).send(user);
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
    console.log(req.body);
    var username = req.body.username;
    var data = req.body.data;
    var findUser = Q.nbind(User.findOne, User);

    findUser({username: username})
      .then(function(user) {
        console.log(user);
        user.update(data, function(err, raw) {
          user.save(function(error) {
            console.log(user);
            user.emitUpdate(username)
            res.send('updating');
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
  }

};
