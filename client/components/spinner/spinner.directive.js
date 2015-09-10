/* spinner.directive.js */
(function() {

  'use strict';

  /**
   * spinnerDirective
   * 
   * @description The spinner directive is used for displaying the spinner overlay
   *   on parts where it's warranted.
   * @example <spinner-directive></spinner-directive>
   * @author bot
   */
  angular
    .module('app')
    .directive('spinnerDirective', spinnerDirective);

  function spinnerDirective() {
    var directive = {
      restrict: 'EA',
      scope: {
        display: '='
      },
      templateUrl: 'components/spinner/spinner.directive.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
    }
  }

})();