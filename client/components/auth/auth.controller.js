/* auth.controller.js */
(function() {

  'use strict';

  angular
    .module('app')
    .controller('AuthController', AuthController);

  /**
   * AuthController
   * 
   * @description Contains all the functionality for the AuthController. Returns
   *   nothing.
   * @param {Object} $state The Angular $state service
   * @param {Object} $window The Angular $window service
   * @param {Object} authFactory The auth factory
   */
  function AuthController($state, $window, authFactory) {
    var vm = this;

    vm.user = {};
    vm.signup = signup;
    vm.login = login;
    vm.logout = logout;
    vm.showAlert = false;
    vm.alert = {};
    vm.showSpinner = false;

    /**
     * AuthController.signup
     * 
     * @description Signs a user up. Returns nothing.
     * @param {Object} e The event object from form submission.
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
            message: {
              heading: 'Uh oh...',
              body: error.data
            }
          };
          vm.showSpinner = false;
        });
    }

    /**
     * AuthController.login
     * 
     * @description Logs a user in. Returns nothing.
     * @param {Object} e The event object from form submission.
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
            message: {
              heading: 'Uh oh...',
              body: error.data
            }
          };
          vm.showSpinner = false;
        });
    }

    /**
     * AuthController.logout
     *
     * @description Logs a user out then redirects them home. Returns nothing.
     * @param {Object} e The event object from form submission.
     */
    function logout(e) {
      e.preventDefault();
      authFactory.logout();
      $state.go('home');
    }

  }

})();