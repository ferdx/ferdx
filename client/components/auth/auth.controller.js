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
   * AuthController is where all the actual controller functionality resides.
   */
  function AuthController($state, $window, authFactory) {
    var vm = this;

    vm.user = {};
    vm.signup = signup;
    vm.login = login;
    vm.logout = logout;

    activate();

    /**
     * activate() Do some checks on load.
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
          authFactory.authUser = data.data;
          $state.go('ferd.config');
        })
        .catch(function(error) {
          console.log('there was an error');
        });
    }

    /**
     * login() Logs a user in. Returns nothing.
     */
    function login(e) {
      e.preventDefault();

      authFactory.login(vm.user)
        .then(function(data) {
          authFactory.authUser = data.data;
          $state.go('ferd.config');
        })
        .catch(function(error) {
          console.log('there was an error');
        });
    }

    /**
     * logout() Logs a user out. Returns nothing.
     * 
     * @param {Object} e The event object from the form submission.
     */
    function logout(e) {
      e.preventDefault();

      authFactory.logout(vm.user)
      authFactory.authUser = {};
      $state.go('home');
    }

  }

})();