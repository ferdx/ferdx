/* auth.factory.js */
(function() {

  'use strict';

  angular
    .module('app')
    .factory('authFactory', authFactory);

  /**
   * authFactory
   *
   * @description The authentication factory.
   * @param {Object} $http The $http service
   * @param {Object} $window The $window service
   * @return {Object} The factory
   */
  function authFactory($http, $window) {

    var factory = {
      signup: signup,
      login: login,
      logout: logout,
      update: update,
      deleteUser: deleteUser,
      isAuth: isAuth,
      getAuthUser: getAuthUser,
      authUser: {}
    };

    return factory;

    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    /**
     * authFactory.signup
     *
     * @description Signs a new user up.
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
     * authFactory.login
     *
     * @description Logs in a user
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
     * authFactory.logout
     *
     * @description Logs a user out. Returns nothing.
     */
    function logout() {
      $window.localStorage.setItem('username', undefined);
      $window.localStorage.removeItem('ferdxAuthIdentifier');
      factory.authUser = {};
    }

    /**
     * authFactory.update
     *
     * @description Updates a user
     * @param {[type]}
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
          throw error.data;
        });
    }

    /**
     * authFactory.delete
     */
    function deleteUser(data) {
      return $http.post('/api/users/deleteuser', data)
        .then(function(response) {
          return response;
        })
        .catch(function(error) {
          throw error.data;
        });
    }

    /**
     * authFactory.isAuth
     *
     * @description [description]
     * @return {Boolean}
     */
    function isAuth() {
      var token = $window.localStorage.getItem('ferdxAuthIdentifier');
      return !!token;
    }

    /**
     * authFactory.getAuthUser
     *
     * @description [description]
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
        .catch(function(error) {
          throw error.data;
        });
    }

  }

})();
