/* jshint expr: true */

/**
 * Test requirements
 */
var expect = require('chai').expect;
var app = require('../../config/server.js');
var request = require('supertest');
var mongoose = require('mongoose');
var User = require('./userModel');

/**
 * User tests
 * 
 * @param {Object} 
 * @return {[type]}
 */
describe('User tests', function() {

  var user1Creds = { username: 'nick' };
  var user2Creds = { username: 'nick', password: '1234' };
  var user3Creds = { username: 'nick', password: '1234', slackOrganization: 'nick.ferdx.com' };
  var user4Creds = { username: 'nick', password: '1234', slackOrganization: 'nick.ferdx.com' };
  var user5Creds = { username: 'nick2', password: '1234', slackOrganization: 'nick.ferdx.com' };
  var testUser = { username: 'ferd', password: '1234', slackOrganization: 'ferdthedude.slack.com' };
  var testUser2 = { username: 'ferd2', password: '1234', slackOrganization: 'ferdthedude2.slack.com' };
  var testUser3 = { username: 'ferd3', password: '1234', slackOrganization: 'ferdthedude3.slack.com' };

  /**
   * User tests -> beforeEach
   * 
   * @param {[type]} 
   * @param {[type]} 
   * @return {[type]}
   */
  before(function(done) {
    mongoose.connect('mongodb://localhost/ferdx_test');
    User.create(testUser, function(err, raw) {
      done();
    });
  });

  /**
   * User tests -> afterEach
   * 
   * @param {[type]} 
   * @param {[type]} 
   * @return {[type]}
   */
  after(function(done) {
    User.remove({}, function(err, raw) {
      mongoose.disconnect();
      done();
    });
  });

  /**
   * User tests -> basic definitions
   * 
   * @param {[type]} 
   * @return {[type]}
   */
  describe('Basic definitions', function() {
    it('should be defined', function() {
      expect(User).to.be.defined;
    });
  });

  /**
   * User tests -> user model
   * 
   * @param {[type]} 
   * @return {[type]}
   */
  describe('User model', function() {
    var user1;
    var user2;
    var user3;
    var user4;
    var user5;

    before(function(done) {
      User.create(user1Creds, function(err, raw) {
        if (raw) { user1 = raw; }
        done();
      });
    });

    before(function(done) {
      User.create(user2Creds, function(err, raw) {
        if (raw) { user2 = raw; }
        done();      
      });
    });

    before(function(done) {
      User.create(user3Creds, function(err, raw) {
        if (raw) { user3 = raw; }
        done();
      });
    });

    before(function(done) {
      User.create(user4Creds, function(err, raw) {
        if (raw) { user4 = raw; }
        done();
      });
    });

    before(function(done) {
      User.create(user5Creds, function(err, raw) {
        if (raw) { user5 = raw; }
        done();
      });
    });

    /**
     * User tests -> user model -> password not supplied
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should not add a user if a password is not supplied', function() {
      expect(user1).to.be.undefined;
    });

    /**
     * User tests -> user model -> slack organization not supplied
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should not add a user if a slack organization is not supplied', function() {
      expect(user2).to.be.undefined;
    });

    /**
     * User tests -> user model -> creates a new user
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should create a new user when all fields added', function() {
      expect(user3).to.be.defined;
      expect(user3.username).to.equal('nick');
    });

    /**
     * User tests -> user model -> doesn't create user if username already exists
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should not create a new user if one already exists', function() {
      expect(user4).to.be.undefined;
    });

    /**
     * User tests -> user model -> doesn't create user if slack org already
     * exists
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should not create a new user if slackOrganization already exists', function() {
      expect(user5).to.be.undefined;
    });

  });
  
  /**
   * User tests -> user login
   * 
   * @param {[type]} 
   * @return {[type]}
   */
  describe('User login', function() {

    /**
     * User tests -> user login -> successful login returns 201
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should return 201 when a user successfully logs in', function(done) {
      request(app)
        .post('/api/users/login')
        .send(testUser)
        .expect(201)
        .end(function(error, response) {
          if (error) { throw new Error(error.message); }
          done();
        });
    });

    /**
     * User tests -> user login -> succesfful login returns user data
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should return the user data when a user successfully logs in', function(done) {
      request(app)
        .post('/api/users/login')
        .send(testUser)
        .expect(201)
        .end(function(error, response) {
          if (error) { throw new Error(error.message); }
          expect(response.body.username).to.equal(testUser.username);
          done();
        });
    });

    /**
     * User tests -> user login -> failed login returns 400
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should return 400 when user fails login', function(done) {
      request(app)
        .post('/api/users/login')
        .send({username: 'garble', password: '1234'})
        .expect(400)
        .end(function(error, response) {
          if (error) { throw new Error(error.message); }
          done();
        });
    });

  });

  /**
   * User tests -> user signup
   * 
   * @param {[type]} 
   * @return {[type]}
   */
  describe('User signup', function() {

    /**
     * User tests -> user signup -> beforeEach remove ferd2
     * 
     * @param {[type]} 
     * @param {[type]} 
     * @return {[type]}
     */
    beforeEach(function(done) {
      User.remove({username: 'ferd2'}, function() {
        done();
      });
    });

    /**
     * User tests -> user signup -> before add ferd3
     * 
     * @param {[type]} 
     * @param {[type]} 
     * @return {[type]}
     */
    before(function(done) {
      User.create(testUser3, function(err, raw) {
        done();
      });
    });

    /**
     * User tests -> user signup -> successful sign up returns 201
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should return a 201 on successful sign up', function(done) {
      request(app)
        .post('/api/users/signup')
        .send(testUser2)
        .expect(201)
        .end(function(error, response) {
          if (error) { throw new Error(error.message); }
          done();
        });
    });

    /**
     * User tests -> user signup -> successful signup returns user data
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should return the user data when a user successfully signs up', function(done) {
      request(app)
        .post('/api/users/signup')
        .send(testUser2)
        .expect(201)
        .end(function(error, response) {
          if (error) { throw new Error(error.message); }
          expect(response.body.username).to.equal(testUser2.username);
          done();
        });
    });

    /**
     * User tests -> user signup -> failed signup returns 400
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    it('should return a 400 if user already exists', function(done) {
      request(app)
        .post('/api/users/signup')
        .send(testUser3)
        .expect(400)
        .end(function(error, response) {
          if (error) { throw new Error(error.message); }
          done();
        });
    });

  });

  /**
   * User tests -> user update
   * 
   * @param {[type]} 
   * @return {[type]}
   */
  describe('User update', function() {
    
  });

});