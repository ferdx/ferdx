var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var request = require('request');
var Q = require('q');
var SALT_WORK_FACTOR  = 10;

/**
 * UserSchema
 *
 * @type {mongoose}
 */
var UserSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    unique: true
  },

  slackOrganization: {
    type: String,
    required: true,
    unique: true
  },

  password: {
    type: String,
    required: true
  },

  salt: {
    type: String
  },

  botKey: {
    type: String,
    default: null
  },

  botModules: {
    type: Array,
    default: []
  }

});

/**
 * comparePasswords()
 *
 * @param {[type]}
 * @return {[type]}
 */
UserSchema.methods.comparePasswords = function(candidatePassword) {
  var defer = Q.defer();
  var savedPassword = this.password;
  bcrypt.compare(candidatePassword, savedPassword, function (err, isMatch) {
    if (err) {
      defer.reject(err);
    } else {
      defer.resolve(isMatch);
    }
  });
  return defer.promise;
};

/**
 * Notifies MegaFerd server that an update has occured
 * @param  {String} username [description]
 */
UserSchema.methods.emitUpdate = function(username) {
  var endpoint = 'http://localhost:3000/api/ferd/update';
  request.post(endpoint, {json: {username: username}},
    function(err, httpResponse, body) {
      //
  });
}

/**
 * pre('save')
 *
 * @param {[type]}
 * @return {[type]}
 */
UserSchema.pre('save', function (next) {
  var user = this;

  if (!user.isModified('password')) { return next(); }

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) { return next(err); }

    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }

      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

module.exports = mongoose.model('users', UserSchema);
