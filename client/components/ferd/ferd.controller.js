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
  function FerdController(authFactory, ferdFactory) {

    var vm = this;

    vm.user = {};
    vm.submitKey = submitKey;
    vm.updateModules = updateModules;
    vm.getBotModules = getBotModules;
    vm.botModules = [];
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
        vm.getBotModules();
      } else if (authFactory.isAuth() && !authFactory.authUser.botKey) {
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

    function getBotModules() {
      ferdFactory.getAvailableModules()
      .then(function(response) {
        vm.botModules = JSON.parse(response.data.body);
      });
    }

  }

})();
