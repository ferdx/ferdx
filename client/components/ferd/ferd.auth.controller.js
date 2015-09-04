/**
 * The FerdAuthController 
 */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('FerdAuthController', FerdAuthController);

  /**
   * FerdAuthController is where all the actual controller functionality resides.
   */
  function FerdAuthController($state) {
    
    var vm = this;

    activate();

    /**
     * activate() Do some stuff on load
     * 
     * @return {[type]}
     */
    function activate() {
      // $state.go('ferd.auth.login');
    }

  }

})();