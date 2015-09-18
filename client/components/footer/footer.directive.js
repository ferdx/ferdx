/* footer.directive.js */
(function() {

  'use strict';

  angular
    .module('app')
    .directive('footerDirective', footerDirective);

  /**
   * footerDirective
   * 
   * @description The footer directive is used for displaying the footer on all
   *   pages.
   * @return {Object} The directive
   */
  function footerDirective() {
    var directive = {
      restrict: 'EA',
      scope: {},
      templateUrl: 'components/footer/footer.directive.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
    }
  }

})();