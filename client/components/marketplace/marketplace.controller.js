(function() {

  'use strict';

  angular
    .module('app')
    .controller('MarketplaceController', MarketplaceController);

  function MarketplaceController(botFactory) {
    var vm = this;

    vm.getBotModules = getBotModules;

    activate();

    function activate() {
      vm.getBotModules();
    }

    function getBotModules() {
      botFactory.getAllBotModules()
      .then(function(response) {
        vm.modules = JSON.parse(response.data.body).modules;
      });
    }
  }

})();
