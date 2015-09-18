/* spinner.directive.js */
(function() {

  'use strict';

  angular
    .module('app')
    .directive('spinnerDirective', spinnerDirective);

  /**
   * spinnerDirective
   * 
   * @description The spinner directive is used for displaying the spinner overlay
   *   on parts where it's warranted.
   * @return {Object} The directive
   */
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