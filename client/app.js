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
      'ui.router',
      'checklist-model'
    ])
    .config(config)
    .run(run);

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
      .state('ferd', {
        url: '/ferd',
        templateUrl: 'components/ferd/ferd.html',
      })
      .state('ferd.auth', {
        url: '/auth',
        templateUrl: 'components/ferd/ferd.auth.html'
      })
      .state('ferd.auth.login', {
        url: '/login',
        templateUrl: 'components/ferd/ferd.auth.login.html'
      })
      .state('ferd.auth.signup', {
        url: '/signup',
        templateUrl: 'components/ferd/ferd.auth.signup.html'
      })
      .state('ferd.config', {
        url: '/config',
        templateUrl: 'components/ferd/ferd.config.html',
        authenticate: true
      })
      .state('ferd.config.addkey', {
        url: '/addkey',
        templateUrl: 'components/ferd/ferd.config.addkey.html',
        authenticate: true
      })
      .state('ferd.config.settings', {
        url: '/settings',
        templateUrl: 'components/ferd/ferd.config.settings.html',
        authenticate: true
      });

    $stateProvider
      .state('marketplace', {
        url: '/marketplace',
        templateUrl: 'components/marketplace/marketplace.html'
      });
  }

  /**
   * run() runs stuff at run time
   * 
   * @return {[type]}
   */
  function run($rootScope, $location, $state, authFactory) {

    $rootScope.$on('$stateChangeSuccess', function(e, next) {

      // if authentication req and user not auth
      if (next && next.authenticate && !authFactory.isAuth()) {
        $state.go('home');
      }

      // if we hit ferd and user not auth
      if (next && next.name === 'ferd' && !authFactory.isAuth()) {
        $state.go('ferd.auth');
      }

      // if we hit ferd and user is auth
      if (next && next.name === 'ferd' && authFactory.isAuth()) {
        $state.go('ferd.config');
      }

      // if we hit ferd auth and user is auth
      if (next && next.name === 'ferd.auth' && authFactory.isAuth()) {
        $state.go('home');
      }

      // if we hit config
      if (next && next.name === 'ferd.config' && authFactory.isAuth()) {
        console.log('hi');
        // $state.go('home');
      }

    });
  }

})();