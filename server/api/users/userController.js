var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');
var request = require('request');

module.exports = {

  /**
   * signup
   * 
   * @description Signs a user up.
   * @param {Object} req The request object sent from the client
   * @param {Object} res The response object
   * @param {Function} next The next function
   * @return {Object} The created user
   */
  signup: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var slackOrganization = req.body.slackOrganization;
    var newUser;

    User.findOne({username: username}, function(error, user) {
      if (error) {
        res.status(500).send({message: 'Sorry, there was an error handling your request. Please refresh your browser and try again!'});
        return;
      }

      if (user) {
        res.status(400).send({data: 'Sorry, but someone already signed up with that username. Try again!'});
        return;
      }

      var newUser = new User({
        username: username,
        password: password,
        slackOrganization: slackOrganization
      });

      newUser.save(function(error) {
        if (error) {
          res.status(500).send({data: 'Sorry, but there was an error trying to sign you up. Please try again.'});
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
   * login
   * 
   * @description Logs a user in.
   * @param {Object} req The request object sent from the client
   * @param {Object} res The response object
   * @param {Function} next The next function
   * @return {Object} returns user data on success, error on fail
   */
  login: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function(error, user) {
      if (error) {
        res.status(500).send({message: 'Sorry, there was an error handling your request. Please refresh your browser and try again!'});
        return;
      }

      if (!user) {
        res.status(400).send({data: 'Sorry, but your credentials were invalid. Please try again.'});
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
              res.status(400).send({data: 'Sorry, but your credentials were invalid. Please try again.'});
              return;
            }
          });
      }
    });
  },

  /**
   * update
   *
   * @description Updates a user details. 
   * @param {Object} req The request object sent from the client
   * @param {Object} res The response object
   * @param {Function} next The next function
   * @return {Object} Returns user data on success, error on fail
   */
  update: function(req, res, next) {
    var data = req.body.data;
    var username = req.body.username;

    if (data.botKey) {
      User.findOne({botKey: data.botKey}, function(error, key) {
        if (key) {
          res.status(400).send({data: 'Sorry, but you can\'t register the same bot twice.'});
        } else {
          _update();
        }
      });
    } else {
      _update();
    }

    function _update() {
      User.findOneAndUpdate({username: username}, data, {new: true}, function(err, doc) {
        doc.emitUpdate(doc.username);
        res.status(201).send(doc);
      });
    }
  },

  /**
   * deleteUser
   * 
   * @description Deletes a user
   * @param {Object} req The request object sent from the client
   * @param {Object} res The response object
   * @param {Function} next The next function
   * @return {Object} 
   */
  deleteUser: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    User.findOne({username: username}, function(error, user) {
      if (error) {
        res.status(500).send({message: 'Sorry, there was an error handling your request. Please refresh your browser and try again!'});
        return;
      }

      if (!user) {
        res.status(400).send({data: 'Sorry, but your credentials were invalid. Please try again.'});
        return;
      } else {
        user.comparePasswords(password)
          .then(function(foundUser) {
            if (foundUser) {
              User.findOneAndRemove({username: username}, {}, function(error, doc, result) {
                var data = {};
                res.status(201).send(data);
                return;
              });
            } else {
              res.status(400).send({data: 'Sorry, but your credentials were invalid. Please try again.'});
              return;
            }
          });
      }
    });
  },

  /**
   * getAuthUser
   * 
   * @description Gets the currently authenticated user.
   * @param {Object} req The request object sent from the client
   * @param {Object} res The response object
   * @param {Function} next The next function
   * @return {Object} Returns user data on success, error on fail
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

  /**
   * getAvailableModules
   * 
   * @description Gets the available modules.
   * @param {Object} req The request object sent from the client
   * @param {Object} res The response object
   * @param {Function} next The next function
   * @return {Object} 
   */
  getAvailableModules: function(req, res, next) {
    var apiRoute;
    if(process.env.ENVIRONMENT === 'PROD') {
      apiRoute = 'http://ferd-server.herokuapp.com/api/ferd/modules';
    }
    if(process.env.ENVIRONMENT === 'DEV') {
      apiRoute = 'http://localhost:3000/api/ferd/modules';
    }
    request.get(apiRoute, function(err, data) {
      res.send(data);
    });
  }

};
