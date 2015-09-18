/* auth.controller.js */
(function() {

  'use strict';

  angular
    .module('app')
    .controller('AuthController', AuthController);

  /**
   * AuthController
   * 
   * @description Handles all the functionality for the authentication
   *   controller. Returns nothing.
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

    activate();

    /**
     * activate
     *
     * @description [description]
     * @return {[type]}
     */
    function activate() {
    }

    /**
     * signup
     * 
     * @description [description]
     * @param {[type]} 
     * @return {[type]}
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
     * login
     * 
     * @description [description]
     * @param {[type]} 
     * @return {[type]}
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
     * logout
     *
     * @description [description]
     * @param {[type]} 
     * @return {[type]}
     */
    function logout(e) {
      e.preventDefault();
      authFactory.logout();
      $state.go('home');
    }

  }

})();