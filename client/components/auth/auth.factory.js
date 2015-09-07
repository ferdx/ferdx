/**
 * The authFactory
 */
(function() {

  'use strict';

  /**
   * Require the base level module and factory function
   */
  angular
    .module('app')
    .factory('authFactory', authFactory);

  /**
   * authFactory is where all the actual factory functionality resides.
   */
  function authFactory($http, $window) {

    var factory = {
      signup: signup,
      login: login,
      logout: logout,
      update: update,
      isAuth: isAuth,
      getAuthUser: getAuthUser,
      authUser: {}
    };

    return factory;

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    /**
     * signup() Signs a new user up
     *
     * @param {Object} user The user object
     * @return {Object} response The response object
     */
    function signup(user) {
      return $http.post('/api/users/signup', user)
        .then(function(response) {
          $window.localStorage.setItem('ferdxAuthIdentifier', response.data.token);
          $window.localStorage.setItem('username', response.data.username);
          factory.authUser = response.data;
          return response;
        })
        .catch(function(error) {
          throw error.data;
        });
    }

    /**
     * login() Logs in a user
     *
     * @param {Object} user The user object
     * @return {Object} response The response object
     */
    function login(user) {
      return $http.post('/api/users/login', user)
        .then(function(response) {
          $window.localStorage.setItem('ferdxAuthIdentifier', response.data.token);
          $window.localStorage.setItem('username', response.data.username);
          factory.authUser = response.data;
          return response;
        })
        .catch(function(error) {
          throw error.data;
        });
    }

    /**
     * logout() Logs a user out. Returns nothing.
     */
    function logout() {
      $window.localStorage.setItem('username', undefined);
      $window.localStorage.removeItem('ferdxAuthIdentifier');
      factory.authUser = {};
    }

    /**
     * update() Updates a user
     *
     * @param {[type]}
     * @return {[type]}
     */
    function update(username, data) {
      var json = {
        username: username,
        data: data
      };
      return $http.post('/api/users/update', json)
        .then(function(response) {
          _.extend(factory.authUser, response.data);
          return response;
        })
        .catch(function(error) {
          return error;
        });
    }

    /**
     * isAuth()
     *
     * @return {Boolean}
     */
    function isAuth() {
      var token = $window.localStorage.getItem('ferdxAuthIdentifier');
      return !!token;
    }

    /**
     * getAuthUser()
     *
     * @return {[type]}
     */
    function getAuthUser() {
      var token = $window.localStorage.getItem('ferdxAuthIdentifier');
      var username = $window.localStorage.getItem('username');

      return $http.post('/api/users/getauthuser', {username: username})
        .then(function(response) {
          response.data.token = token;
          return response;
        })
        .catch(function(err) {
          return err;
        });
    }

  }

})();
