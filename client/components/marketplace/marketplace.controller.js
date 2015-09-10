
(function() {

  'use strict';

  angular
    .module('app')
    .controller('MarketplaceController', MarketplaceController);

  function MarketplaceController(marketplaceFactory) {
    var vm = this;

    getBotModules();

    function getBotModules() {
      marketplaceFactory.getAvailableModules()
      .then(function(response) {
        vm.modules = JSON.parse(response.data.body).modules;
      });
    }
  }

})();
