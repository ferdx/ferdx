/**
 * The FerdController 
 */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('FerdController', FerdController);

  /**
   * FerdController is where all the actual controller functionality resides.
   */
  function FerdController(authFactory) {
    
    var vm = this;

    vm.user = {};
    vm.submitKey = submitKey;
    vm.updateModules = updateModules;
    vm.botModules = ['yo', 'hi', 'bart', 'bacon'];
    vm.selectedModules = authFactory.authUser.botModules;
    vm.showSettings = false;
    vm.showSetup = false;

    activate();

    /**
     * activate() Do some stuff on load. Returns nothing.
     */
    function activate() {
      if (authFactory.isAuth() && authFactory.authUser.botKey) {
        vm.showSettings = true;
      } else if (authFactory.isAuth() && !authFactory.authUser.botKey) {
        console.log(authFactory.authUser);
        vm.showSetup = true;
      }
    }

    /**
     * submitKey() Submits the api key
     * 
     * @param {Object} e The event object supplied on form submission
     */
    function submitKey(e) {
      e.preventDefault();

      console.log('here?');

      authFactory.update(authFactory.authUser.username, {botKey: vm.apikey})
        .then(function(data) {
          console.log('successful update');
        })
        .catch(function(error) {
          console.log('there was an error');
        });
    }

    /**
     * updateModules() updates activated Ferd modules
     * 
     * @param {array} 
     */
    function updateModules(e, moduleArray) {
      e.preventDefault();

      authFactory.update(authFactory.authUser.username, {botModules: moduleArray})
        .then(function(data) {
          console.log('successful update');
        })
        .catch(function(error) {
          console.log('there was an error');
        });
    }

  }

})();