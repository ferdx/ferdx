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
   *   Returns nothing.
   * @param {Object} $state The UI Router $state
   * @param {Object} authFactory The authentication factory
   * @param {Object} ferdFactory The Ferd factory
   * @param {Object} botFactory The bot factory
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

    // shows alerts for various stuff, and initialize alert props to empty
    vm.showAlertForApiKey = false;
    vm.alert = {};

    // deletes a user
    vm.deleteUser = deleteUser;

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
     * @param {Object} e The event object supplied on form submission
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
          vm.showAlertForApiKey = true;
          vm.alert = {
            type: 'error',
            message: {
              heading: 'Uh oh...',
              body: 'Your API key doesn\'t seem to match your account. Try submitting again.'
            }
          };
        });
    }

    /**
     * FerdController.getAllBotModules
     *
     * @description Gets all bot modules, and updates the scope property to
     *   reflect. Returns nothing.
     */
    function getAllBotModules() {
      botFactory.getAllBotModules()
        .then(function(response) {
          vm.allBotModules = JSON.parse(response.data.body).modules;
        });
    }

    /**
     * FerdController.setUserBotModules
     *
     * @description Updates activated Ferd modules for a user. Returns nothing.
     * @param {Object} e The event object supplied on form submission
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

    /**
     * FerdController.deleteUser
     *
     *
     */
    function deleteUser(e) {
      e.preventDefault();
      vm.showSpinner = true;
      var userData = {
        username: vm.deleteUsername,
        password: vm.deletePassword
      };
      authFactory.update(authFactory.authUser.username, {botModules: []})
        .then(function(data) {
          console.log(data);
          return authFactory.deleteUser(userData);
        })
        .then(function(){
          vm.showSpinner = false;
          authFactory.logout();
          $state.go('home');
        })
        .catch(function(error) {
          vm.showSpinner = false;

          // TODO: Display an error alert here
          console.log('there was an error');
        });
    }

  }

})();
