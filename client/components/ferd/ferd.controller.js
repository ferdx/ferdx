/**
 * The FerdController
 */
(function() {

  'use strict';

  /**
   * Require the base level module and controller
   */
  angular
    .module('app')
    .controller('FerdController', FerdController);

  /**
   * FerdController is where all the actual controller functionality resides.
   */
  function FerdController($state, authFactory, ferdFactory, botFactory) {

    var vm = this;

    // submits the api key
    vm.submitKey = submitKey;

    // gets and sets all bot modules from the server
    vm.getAllBotModules = getAllBotModules;
    vm.allBotModules = [];

    // sets and gets user bot modules
    vm.setUserBotModules = setUserBotModules;
    vm.userBotModules = authFactory.authUser.botModules;

    // determines which pane to show, depending on whether a user has entered
    // their api key or not
    vm.showSettings = false;
    vm.showSetup = false;

    activate();

    /**
     * activate() Do some stuff on load. Returns nothing.
     */
    function activate() {
      if (authFactory.isAuth() && authFactory.authUser.botKey) {
        vm.showSettings = true;
        vm.showSetup = false;
        vm.getAllBotModules();
      } else if (authFactory.isAuth() && !authFactory.authUser.botKey) {
        vm.showSetup = true;
        vm.showSettings = false;
      }
    }

    /**
     * submitKey() Submits the api key
     *
     * @param {Object} e The event object supplied on form submission
     */
    function submitKey(e) {
      e.preventDefault();
      ferdFactory.verifyKey(vm.apikey)
        .then(function() {
          authFactory.update(authFactory.authUser.username, {botKey: vm.apikey})
            .then(function(data) {
              activate();
            });
        })
        .catch(function(error) {
          console.log('there was an error');
        });
    }

    /**
     * getAllBotModules
     * 
     * @return {[type]}
     */
    function getAllBotModules() {
      botFactory.getAllBotModules()
        .then(function(response) {
          vm.allBotModules = JSON.parse(response.data.body).modules;
        });
    }

    /**
     * setUserBotModules() updates activated Ferd modules
     *
     * @param {array}
     */
    function setUserBotModules(e) {
      e.preventDefault();
      authFactory.update(authFactory.authUser.username, {botModules: vm.userBotModules})
        .then(function(data) {
          // TODO: Display a success alert here
          console.log('successful update');
        })
        .catch(function(error) {
          // TODO: Display an error alert here
          console.log('there was an error');
        });
    }

  }

})();
