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
    vm.login = login;
    vm.signup = signup;

    activate();

    /**
     * activate() Do some checks on load
     * 
     * @return {[type]}
     */
    function activate() {
      if (authFactory.isAuth()) {
        console.log('we have an auth user');

        authFactory.getAuthUser()
          .then(function(data) {
            console.log(data);
          })
          .catch(function(err) {
            console.log(err);
          });
      }
    }

    /**
     * login() logs a user in
     * 
     * @return {}
     */
    function login(e) {
      e.preventDefault();

      authFactory.login(vm.user)
        .then(function (token) {
          $window.localStorage.setItem('ferdxAuthIdentifier', token);
        })
        .catch(function (error) {
          vm.message = "Invalid Username or Password";
          console.error(error);
        });
    }

    /**
     * signup() signs a user up
     * 
     * @return {}
     */
    function signup(e) {
      e.preventDefault();

      authFactory.signup(vm.user)
        .then(function (token) {
          console.log('signup promise then block');
          $window.localStorage.setItem('ferdxAuthIdentifier', token);
        })
        .catch(function (error) {
          vm.message = "Username Already Taken";
          console.error(error);
        });
    }
  }

})();