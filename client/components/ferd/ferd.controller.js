/* ferd.controller.js */
(function() {

  'use strict';

  angular
    .module('app')
    .controller('FerdController', FerdController);

  /**
   * FerdController
   * 
   * @description Contains all the functionality for the Ferd Controller.
   * @param {[type]} 
   * @param {[type]} 
   * @param {[type]} 
   * @param {[type]} 
   */
  function FerdController($state, authFactory, ferdFactory, botFactory) {

    var vm = this;

    // submits the api key
    vm.submitKey = submitKey;

    // sets user slack organization name
    vm.userSlackOrganizationName = authFactory.authUser.slackOrganization;

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

    // decides whether to show the spinner or not
    vm.showSpinner = false;

    activate();

    /**
     * activate
     *
     * @description Does some stuff on load. Returns nothing.
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
     * FerdController.submitKey
     * 
     * @description Submits the api key. Returns nothing.
     * @param {Object} The event object supplied on form submission
     */
    function submitKey(e) {
      e.preventDefault();
      vm.showSpinner = true;
      ferdFactory.verifyKey(vm.apikey)
        .then(function() {
          authFactory.update(authFactory.authUser.username, {botKey: vm.apikey})
            .then(function(data) {
              vm.showSpinner = false;
              activate();
            });
        })
        .catch(function(error) {
          vm.showSpinner = false;

          // TODO: handle error properly
          console.log('there was an error');
        });
    }

    /**
     * FerdController.getAllBotModules
     *
     * @description [description]
     * @return {[type]}
     */
    function getAllBotModules() {
      botFactory.getAllBotModules()
        .then(function(response) {
          vm.allBotModules = JSON.parse(response.data.body).modules;
        });
    }

    /**
     * setUserBotModules
     *
     * @description Updates activated Ferd modules for a user
     * @param {Object} The event object supplied on form submission
     */
    function setUserBotModules(e) {
      e.preventDefault();
      vm.showSpinner = true;
      authFactory.update(authFactory.authUser.username, {botModules: vm.userBotModules})
        .then(function(data) {
          vm.showSpinner = false;

          // TODO: Display a success alert here
          console.log('successful update');
        })
        .catch(function(error) {
          vm.showSpinner = false;
          
          // TODO: Display an error alert here
          console.log('there was an error');
        });
    }

  }

})();
