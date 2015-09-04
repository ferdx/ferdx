
/**
 * Factory for interfacing with FerdX server for all available modules
 * with MegaFerd server.
 */
(function() {

  angular
    .module('app')
    .factory('ferdFactory', ferdFactory);

    function ferdFactory($http) {

      factory = {
        getAvailableModules: getAvailableModules
      };

      return factory;

      ////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////

      /**
       * Sends a GET request to server for all available modules
       * @return {Object} response data
       */
      function getAvailableModules(data) {
        return $http.get('/api/users/modules', data)
          .then(function(response) {
            return response;
          });
      };

    }

})();
