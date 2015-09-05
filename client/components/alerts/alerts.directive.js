/* alerts.directive.js */
(function() {

  'use strict';

  /**
   * alertsDirective
   * 
   * @description The alerts directive is used for displaying alerts in general,
   *   like error and success handling on form submissions.
   * @example <alerts-directive></alerts-directive>
   * @author bot
   */
  angular
    .module('app')
    .directive('alertsDirective', alertsDirective);

  function alertsDirective() {
    var directive = {
      restrict: 'EA',
      scope: {
        alert: '='
      },
      templateUrl: 'components/alerts/alerts.directive.html',
      link: link
    }

    return directive;

    function link(scope, elem, attrs) {
      console.log('link is running');
    }
  }

})();