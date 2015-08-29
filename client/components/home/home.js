/**
 * The home controller. 
 */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('HomeController', HomeController);

  /**
   * HomeController is where all the actual controller functionality resides.
   */
  function HomeController() {
    var vm = this;

    vm.username = 'Nick';
  }

})();