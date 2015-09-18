/* alerts.directive.js */
(function() {

  'use strict';

  angular
    .module('app')
    .directive('alertsDirective', alertsDirective);

  /**
   * alertsDirective
   * 
   * @description The alerts directive is used for displaying alerts in general,
   *   like error and success handling on form submissions.
   * @return {Object} The directive
   */
  function alertsDirective() {
    var directive = {
      restrict: 'EA',
      scope: {
        alert: '='
      },
      templateUrl: 'components/alerts/alerts.directive.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
    }
  }

})();