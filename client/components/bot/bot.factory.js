/**
 * Factory for handling everything to do with the bots.
 */
(function() {

  angular
    .module('app')
    .factory('botFactory', botFactory);

    function botFactory($http) {

      factory = {
        getAllBotModules: getAllBotModules
      };

      return factory;

      ////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////

      /**
       * Sends a GET request to server for all available modules
       * @return {Object} response data
       */
      function getAllBotModules(data) {
        return $http.get('/api/users/modules', data)
          .then(function(response) {
            return response;
          });
      }

    }

})();
