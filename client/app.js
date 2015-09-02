/**
 * This is the default module that bootstraps up angular.
 */
(function() {

  /**
   * Always declare 'use strict'
   */
  'use strict';

  /**
   * Require the base level module which will be used in ng-app
   */
  angular
    .module('app', [
      'ui.router'
    ])
    .config(config);

  /**
   * config() Bootstraps the initial configuration for our application, setting
   * up the states based on UI Router. Returns nothing.
   */
  function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html'
      });

    $stateProvider
      .state('getferd', {
        url: '/getferd',
        templateUrl: 'components/getferd/getferd.html'
      })
      .state('getferd.auth', {
        url: '/auth',
        templateUrl: 'components/getferd/getferd.auth.html'
      })
      .state('getferd.config', {
        url: '/config',
        templateUrl: 'components/getferd/getferd.config.html'
      })
      .state('getferd.auth.login', {
        url: '/login',
        templateUrl: 'components/getferd/getferd.auth.login.html'
      })
      .state('getferd.auth.signup', {
        url: '/signup',
        templateUrl: 'components/getferd/getferd.auth.signup.html'
      });

    $stateProvider
      .state('marketplace', {
        url: '/marketplace',
        templateUrl: 'components/marketplace/marketplace.html'
      });
  }

})();