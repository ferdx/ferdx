/**
 * The FerdConfigController 
 */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('FerdConfigController', FerdConfigController);

  /**
   * FerdConfigController is where all the actual controller functionality resides.
   */
  function FerdConfigController($state, authFactory) {
    
    var vm = this;
    
    vm.user = {};
    vm.submitKey = submitKey;
    vm.updateModules = updateModules;
    vm.botModules = ['yo', 'hi', 'bart', 'bacon'];
    vm.selectedModules = [];

    activate();

    /**
     * activate() Do some stuff on load
     * 
     * @return {[type]}
     */
    function activate() {
      authFactory.getAuthUser()
        .then(function(response) {
          vm.user = response.data;
          if (vm.user.botKey) {
            console.log('hi?');
            $state.go('ferd.config.settings');
          } else {
            $state.go('ferd.config.addkey');
          }
        })
        .catch(function(error) {

        });
    }

    /**
     * submitKey() submits the api key
     * 
     * @param {[type]} 
     * @return {[type]}
     */
    function submitKey(e) {
      e.preventDefault();
      authFactory.update(vm.user.username, {botKey: vm.apikey})
        .then(function(data) {
          console.log(data);
          $state.go('ferd.config.settings');
        })
        .catch(function(error) {
          console.log(error);
        });
    }

    /**
     * updateModules() updates activated Ferd modules
     * 
     * @param {array} 
     */
    function updateModules(e, moduleArray) {
      e.preventDefault();

      authFactory.update(vm.user.username, {botModules: moduleArray})
        .then(function(data) {
          console.log(data);
          $state.go('ferd.config.settings');
        })
        .catch(function(error) {
          console.log(error);
        });
    }

  }

})();