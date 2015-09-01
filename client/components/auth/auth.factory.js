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
        .then(function (resp) {
          $window.localStorage.setItem('username', resp.config.data.username);
          return resp.data.token;
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
        .then(function (resp) {
          $window.localStorage.setItem('username', resp.config.data.username);
          return resp.data.token;
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
        .then(function (resp) {
          return resp.data.token;
        });
    }

    /**
     * isAuth()
     * 
     * @return {Boolean}
     */
    function isAuth() {
      return !!$window.localStorage.getItem('ferdxAuthIdentifier');
    }

    /**
     * getAuthUser()
     * 
     * @return {[type]}
     */
    function getAuthUser() {
      var data = {username: window.localStorage.getItem('username')}
      return $http.post('/api/users/getauthuser', data)
        .then(function(response) {
          return response;
        });
    }

  }

})();