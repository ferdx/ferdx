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
  function FerdController() {
    
    var vm = this;

    activate();

    /**
     * activate() Do some checks on load
     * 
     * @return {[type]}
     */
    function activate() {
      
    }

  }

})();