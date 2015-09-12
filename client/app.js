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
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'components/home/home.html'
      });

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'components/auth/login.html'
      });

    $stateProvider
      .state('signup', {
        url: '/signup',
        templateUrl: 'components/auth/signup.html'
      });

    $stateProvider
      .state('ferd', {
        url: '/ferd',
        templateUrl: 'components/ferd/ferd.html',
        authenticate: true
      });

    $stateProvider
      .state('marketplace', {
        url: '/marketplace',
        templateUrl: 'components/marketplace/marketplace.html'
      });

    $stateProvider
      .state('careers', {
        url: '/careers',
        templateUrl: 'components/careers/careers.html'
      });
  }

  /**
   * run() Do some stuff at run time and before the app loads. Returns
   * nothing.
   */
  function run($rootScope, $location, $state, authFactory) {

    // Set up the auth user before anything.
    if (authFactory.isAuth()) {
      authFactory.getAuthUser()
        .then(function(response) {
          authFactory.authUser = response.data;
        })
        .catch(function(error) {

        });
    }

    // Handle the route protection
    $rootScope.$on('$stateChangeSuccess', function(e, next) {
      if (next && next.authenticate && !authFactory.isAuth()) {
        $state.go('login');
      }

      if (next && next.name === 'login' && authFactory.isAuth()) {
        $state.go('home');
      }

      if (next && next.name === 'signup' && authFactory.isAuth()) {
        $state.go('home');
      }
    });

  }

})();