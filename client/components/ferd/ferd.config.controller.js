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

      console.log(vm.apikey);
    }

  }

})();