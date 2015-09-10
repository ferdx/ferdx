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
    vm.showAlert = false;
    vm.alert = {
      type: '',
      message: ''
    };
    vm.showSpinner = false;

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
      vm.showSpinner = true;
      authFactory.signup(vm.user)
        .then(function(data) {
          $state.go('ferd');
          vm.showSpinner = false;
        })
        .catch(function(error) {
          vm.showAlert = true;
          vm.alert = {
            type: 'error',
            message: error.data
          };
          vm.showSpinner = false;
        });
    }

    /**
     * login() Logs a user in. Returns nothing.
     */
    function login(e) {
      e.preventDefault();
      vm.showSpinner = true;
      authFactory.login(vm.user)
        .then(function(data) {
          $state.go('ferd');
          vm.showSpinner = false;
        })
        .catch(function(error) {
          vm.showAlert = true;
          vm.alert = {
            type: 'error',
            message: error.data
          };
          vm.showSpinner = false;
        });
    }

    /**
     * logout() Logs a user out. Returns nothing.
     * 
     * @param {Object} e The event object from the form submission.
     */
    function logout(e) {
      e.preventDefault();
      authFactory.logout();
      $state.go('home');
    }

  }

})();