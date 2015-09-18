/* bot.factory.js */
(function() {

  angular
    .module('app')
    .factory('botFactory', botFactory);

    /**
     * botFactory
     *
     * @description The bot factory.
     * @param {Object} $http The $http Angular service
     * @return {Object} The factory
     */
    function botFactory($http) {

      factory = {
        getAllBotModules: getAllBotModules
      };

      return factory;

      ////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////

      /**
       * botFactory.getAllBotModules
       *
       * @description Sends a GET request to server for all available modules
       * @param {Object} The data to send to the get request
       * @return {Object} Response data
       */
      function getAllBotModules(data) {
        return $http.get('/api/users/modules', data)
          .then(function(response) {
            return response;
          });
      }

    }

})();
