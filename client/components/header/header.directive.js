/* header.directive.js */
(function() {

  'use strict';

  /**
   * headerDirective
   * 
   * @description The header directive is used for displaying the header with
   *   dynamic navigation links, depending on user auth state.
   * @return {Object} The directive
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

      /**
       * nav
       * 
       * @type {HTMLElement}
       * @description The header directive's child navigation element.
       */
      var nav = elem[0].querySelector('.nav');

      /**
       * toggle
       * 
       * @type {HTMLElement}
       * @description The header directive's child navigation toggle button.
       */
      var toggle = elem[0].querySelector('.nav__toggle');

      /**
       * html
       * body
       *
       * @description Caches the html and body elements
       * @type {HTMLElements}
       */
      var html = document.querySelector('html');
      var body = document.querySelector('body');

      /**
       * eventListener
       * 
       * @param {String} click The event type
       * @description Listens for a click on the navigation toggler, and shows
       *   and hides the navigation as necessary. Returns nothing.
       */
      toggle.addEventListener('click', function(e) {
        e.preventDefault();
        var c = toggle.classList.contains('is-active') && nav.classList.contains('is-active') && html.classList.contains('is-hidden') && body.classList.contains('is-hidden');
        if (c) {
          html.classList.remove('is-hidden');
          body.classList.remove('is-hidden');
          toggle.classList.remove('is-active');
          nav.classList.remove('is-active');
        } else {
          html.classList.add('is-hidden');
          body.classList.add('is-hidden');
          toggle.classList.add('is-active');
          nav.classList.add('is-active');
        }
      });
    }
  }

})();