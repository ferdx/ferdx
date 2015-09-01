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
  function AuthController($window, authFactory) {
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
      
      if (authFactory.isAuth()) {
        authFactory.getAuthUser()
          .then(function(data) {
            console.log(data);
          })
          .catch(function(err) {
            console.log(err);
          });
      } else {
        console.log('not logged in');
      }
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
          console.log(data);
        })
        .catch(function (err) {
          console.error(err);
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
          console.log(data);
        })
        .catch(function(err) {
          console.error(err);
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

      vm.user.username = $window.localStorage.getItem('username');

      authFactory.logout(vm.user)
        .then(function(data){    
          console.log(data);
        })
        .catch(function(err) {
          console.error(err);
        });
    }

  }

})();