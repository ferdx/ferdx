/**
 * This is the default controller structure that exhibits best practices for
 * setting up a controller and using it. Always wrap it in an IIFE for safety!
 */
(function() {

  /**
   * Always declare 'use strict' at the top
   */
  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('HelloController', HelloController);

  /**
   * HelloController is where all the actual controller functionality resides.
   */
  function HelloController() {
    /**
     * Use a capture variable for this when using the controllerAs syntax.
     * Choose a consistent variable name such as vm, which stands for ViewModel.
     *
     * Why?: The this keyword is contextual and when used within a function
     * inside a controller may change its context. Capturing the context of this
     * avoids encountering this problem.
     */
    var vm = this;

    /**
     * A sample attachment of a controller param, made accessible inside the
     * HTML wherever a controller is declared.
     */
    vm.hello = 'Hello';
  }

})();