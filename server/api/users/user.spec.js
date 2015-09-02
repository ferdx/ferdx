var expect = require('chai').expect;
var mongoose = require('mongoose');
var User = require('./userModel');

describe('User Tests', function() {

  beforeEach(function(done) {
    mongoose.connect('mongodb://localhost/ferdx');
    User.find({}, function(err, raw) {
      done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function(err, raw) {
      mongoose.disconnect();
      done();
    });
  });

  describe('Basic definitions', function() {
    it('should be defined', function() {
      expect(User).to.be.defined;
    });
  });

  describe('Adding users', function() {
    var user1;
    var user2;
    var user3;
    var user4;

    beforeEach(function(done) {
      User.create({username: 'nick'}, function(err, raw) {
        user1 = raw;
        done();
      });
    });

    beforeEach(function(done) {
      User.create({username: 'nick', password: '1234'}, function(err, raw) {
        user2 = raw;
        done();      
      });
    });

    beforeEach(function(done) {
      User.create({username: 'nick', password: '1234', slackOrganization: 'nick.ferdx.com'}, function(err, raw) {
        user3 = raw;
        done();
      });
    });

    beforeEach(function(done) {
      User.create({username: 'nick', password: '1234', slackOrganization: 'nick.ferdx.com'}, function(err, raw) {
        user4 = raw;
        done();
      });
    });

    it('should not add a user if a password is not supplied', function() {
      expect(user1).to.be.undefined;
    });

    it('should not add a user if a slack channel is not supplied', function() {
      expect(user2).to.be.undefined;
    });

    it('should create a new user when all fields added', function() {
      expect(user3).to.be.defined;
      expect(user3.username).to.equal('nick');
    });

    it('should not create a new user if they already exist', function() {
      expect(user4).to.be.undefined;
    });
  });

  describe('Update user bot modules', function() {

  });
});