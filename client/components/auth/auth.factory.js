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
      isAuth: isAuth,
      getAuthUser: getAuthUser
    };

    return factory;
    
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    /**
     * signup()
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    function signup(user) {
      return $http.post('/api/users/signup', user)
        .then(function(response) {
          $window.localStorage.setItem('ferdxAuthIdentifier', response.data.token);
          $window.localStorage.setItem('username', response.data.username);
          return response;
        });
    }

    /**
     * login()
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    function login(user) {
      return $http.post('/api/users/login', user)
        .then(function(response) {
          $window.localStorage.setItem('ferdxAuthIdentifier', response.data.token);
          $window.localStorage.setItem('username', response.data.username);
          return response;
        });
    }

    /**
     * logout()
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    function logout(user) {
      $window.localStorage.setItem('username', undefined);
      $window.localStorage.removeItem('ferdxAuthIdentifier');
      
      return $http.post('/api/users/logout', user)
        .then(function(response) {
          return response;
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
    function getAuthUser(token) {
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