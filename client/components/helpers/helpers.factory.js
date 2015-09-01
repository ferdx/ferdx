/**
 * The helpersFactory
 */
(function() {

  'use strict';

  /**
   * Require the base level module and factory function
   */
  angular
    .module('app')
    .factory('helpersFactory', helpersFactory);

  /**
   * helpersFactory is where all the actual factory functionality resides.
   */
  function helpersFactory($http) {
    
    var factory = {
      generateHash: generateHash
    };

    return factory;
    
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    
    /**
     * generateHash() Generates a random hash containing lower and uppercase
     * letters a-z, and numbers 1-9.
     * 
     * @return {String}
     */
    function generateHash() {
      var text = '';
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

      for( var i=0; i < 10; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
      }

      return text;
    }

  }

})();