/* marketplace.controller.js */
(function() {

  'use strict';

  angular
    .module('app')
    .controller('MarketplaceController', MarketplaceController);

  /**
   * MarketplaceController
   *
   * @description [description]
   * @param {[type]} 
   * @param {[type]} 
   */
  function MarketplaceController(authFactory, botFactory) {
    var vm = this;

    vm.getBotModules = getBotModules;
    vm.showToggleSwitch = authFactory.isAuth && authFactory.authUser.botKey;

    activate();

    /**
     * activate
     *
     * @description [description]
     * @return {[type]}
     */
    function activate() {
      vm.getBotModules();
    }

    /**
     * MarketplaceController.getBotModules
     *
     * @description [description]
     * @return {[type]}
     */
    function getBotModules() {
      botFactory.getAllBotModules()
      .then(function(response) {
        vm.modules = JSON.parse(response.data.body).modules;
      });
    }
  }

})();