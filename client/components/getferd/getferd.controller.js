/**
 * The GetFerdController
 */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('GetFerdController', GetFerdController);

  /**
   * GetFerdController is where all the actual controller functionality resides.
   */
  function GetFerdController($state, $window, $location, getFerdFactory, helpersFactory) {
    var vm = this;

    vm.queryString;
    vm.token;
    vm.oauthAuthorize = oauthAuthorize;
    vm.oauthAccess = oauthAccess;
    vm.addFerd = addFerd;

    activate();

    /**
     * activate() Activates on route load
     * 
     * @return {[type]}
     */
    function activate() {
      $state.go('getferd.auth.login');
    }

    /**
     * oauthAuthorize() redirects users to the Slack authorize page
     * 
     * @param {Object} the event object
     */
    function oauthAuthorize(e) {
      e.preventDefault();
      var hash = helpersFactory.generateHash();
      var qs = 'client_id=9711269603.9950768502&scope=identify,read,post,client,admin&state=' + hash;
      var path = 'https://slack.com/oauth/authorize?' + qs;
      $window.location.href = path;
    }

    /**
     * oauthAccess()
     * 
     * @return {[type]}
     */
    function oauthAccess() {
      getFerdFactory.access(vm.queryString)
        .then(function(data) {
          vm.token = data.token;
          vm.addFerd();
          console.log(data.data);
        });
    }

    /**
     * addFerd()
     */
    function addFerd() {
      getFerdFactory.addFerd()
        .then(function(data) {
          console.log(data);
        });
    }

  }

})();