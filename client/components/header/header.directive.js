/* alerts.directive.js */
(function() {

  'use strict';

  /**
   * headerDirective
   * 
   * @description The header directive is used for displaying the header with
   *   dynamic navigation links, depending on user auth state.
   * @example <header-directive></header-directive>
   * @author bot
   */
  angular
    .module('app')
    .directive('headerDirective', headerDirective);

  function headerDirective(authFactory) {
    var directive = {
      restrict: 'EA',
      scope: {
        header: '='
      },
      templateUrl: 'components/header/header.directive.html',
      link: link
    };

    return directive;

    function link(scope, elem, attrs) {
      scope.isAuth = authFactory.isAuth();
      scope.logout = authFactory.logout;
    }
  }

})();