/**
 * The AuthController
 */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('AuthController', AuthController);

  /**
   * GetFerdController is where all the actual controller functionality resides.
   */
  function AuthController($state, $window, authFactory) {
    var vm = this;

    vm.user = {};
    vm.signup = signup;
    vm.login = login;
    vm.logout = logout;

    activate();

    /**
     * activate() Do some checks on load
     * 
     * @return {[type]}
     */
    function activate() {
    }

    /**
     * signup() signs a user up
     * 
     * @return {}
     */
    function signup(e) {
      e.preventDefault();

      authFactory.signup(vm.user)
        .then(function(data) {
          $state.go('ferd.config');
        })
        .catch(function (err) {
          // catch the error
          console.log('there was an error');
        });
    }

    /**
     * login() logs a user in
     * 
     * @return {}
     */
    function login(e) {
      e.preventDefault();

      authFactory.login(vm.user)
        .then(function(data) {
          $state.go('ferd.config');
        })
        .catch(function(err) {
          // catch the error
          console.log('there was an error');
        });
    }

    /**
     * logout()
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    function logout(e) {
      e.preventDefault();

      vm.isAuth = false;

      vm.user.username = $window.localStorage.getItem('username');

      authFactory.logout(vm.user)
        .then(function(data) {
          $state.go('home');
        })
        .catch(function(err) {
          console.error(err);
        });
    }

  }

})();