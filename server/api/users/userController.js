var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {

  /**
   * signup()
   * 
   * @param {Object} the request object sent from the client
   * @param {Object} the response object
   * @param {Function} the next function
   * @return {[type]}
   */
  signup: function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var slackOrganization = req.body.slackOrganization;
    var create;
    var newUser;

    var findOne = Q.nbind(User.findOne, User);

    findOne({username: username})
      .then(function(user) {
        if (user) {
          next(new Error('User already exists!'));
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
        user.save();

        var token = jwt.encode(user, 'secret');
        var data = {
          username: user.username,
          slackOrganization: user.slackOrganization,
          botKey: user.botKey,
          botModules: user.botModules,
          token: token
        };
        res.send(data);
      })
      .fail(function(error) {
        next(error);
      });
  },
  
  /**
   * login()
   * 
   * @param {[type]} 
   * @param {[type]} 
   * @param {Function} 
   * @return {[type]}
   */
  login: function(req, res, next) {
    var username = req.body.username;
    var slackOrganization = req.body.slackOrganization;
    var password = req.body.password;

    var findUser = Q.nbind(User.findOne, User);
    
    findUser({username: username})
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
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
                res.send(data);
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  /**
   * logout()
   * 
   * @param {[type]} 
   * @param {[type]} 
   * @param {Function} 
   * @return {[type]}
   */
  logout: function (req, res, next){
      var username = req.body.username;
      var findUser = Q.nbind(User.findOne, User);
      
      findUser({username: username})
        .then(function (user) {
          user.save();
        });
  },

  /**
   * getAuthUser()
   * 
   * @param {[type]} 
   * @param {[type]} 
   * @param {Function} 
   * @return {[type]}
   */
  getAuthUser: function (req, res, next) {
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
      .fail(function (error) {
        next(error);
      });
  }

};