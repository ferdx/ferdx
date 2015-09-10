/* footer.directive.js */
(function() {

  'use strict';

  /**
   * footerDirective
   * 
   * @description The footer directive is used for displaying the footer on all
   *   pages.
   * @example <footer-directive></footer-directive>
   * @author bot
   */
  angular
    .module('app')
    .directive('footerDirective', footerDirective);

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