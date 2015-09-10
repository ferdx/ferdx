/**
 * The marketplaceFactory
 */
(function() {

  'use strict';

  /**
   * Require the base level module and factory function
   */
  angular
    .module('app')
    .factory('marketplaceFactory', marketplaceFactory);

  /**
   * marketplaceFactory is where all the actual factory functionality resides.
   */
  function marketplaceFactory(ferdFactory, authFactory) {

    var factory = {
      getAvailableModules: ferdFactory.getAvailableModules,
      update: authFactory.update
    };

    return factory;

  }

})();
