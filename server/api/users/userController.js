var User = require('./userModel.js');
var Q = require('q');
var jwt = require('jwt-simple');

module.exports = {

  /**
   * signup()
   * 
   * @param {[type]} 
   * @param {[type]} 
   * @param {Function} 
   * @return {[type]}
   */
  signup: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var slackchannel = req.body.slackchannel;
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
            slackchannel: slackchannel,
            password: password
          };
          return create(newUser);
        }
      })
      .then(function (user) {        
        user.save();

        var token = jwt.encode(user, 'secret');
        res.json({token: token});
      })
      .fail(function (error) {
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
  login: function (req, res, next) {
    var username = req.body.username;
    var slackchannel = req.body.slackchannel;
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
                res.json({token: token});
                user.save();
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
   * checkAuth()
   * 
   * @param {[type]} 
   * @param {[type]} 
   * @param {Function} 
   * @return {[type]}
   */
  checkAuth: function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      var user = jwt.decode(token, 'secret');
      var findUser = Q.nbind(User.findOne, User);
      findUser({username: user.username})
        .then(function (foundUser) {
          if (foundUser) {
            res.send(200);
          } else {
            res.send(401);
          }
        })
        .fail(function (error) {
          next(error);
        });
    }
  },

  /**
   * getAuthUser()
   * 
   * @return {[type]}
   */
  getAuthUser: function(req, res, next) {
    var username = req.body.username;
    var findOne = Q.nbind(User.findOne, User);

    findOne({username: username})
      .then(function(user) {
        res.send(user);
      })
      .fail(function (error) {
        next(error);
      });
  }

};