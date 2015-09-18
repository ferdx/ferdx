/* ferd.factory.js */
(function() {

  angular
    .module('app')
    .factory('ferdFactory', ferdFactory);

    /**
     * ferdFactory
     * 
     * @description Factory for interfacing with FerdX server for all available
     *   modules with MegaFerd server.
     * @return {Object} The factory
     */
    function ferdFactory($q, $http, authFactory) {

      factory = {
        getAvailableModules: getAvailableModules,
        verifyKey: verifyKey
      };

      return factory;

      ////////////////////////////////////////////////////////////
      ////////////////////////////////////////////////////////////

      /**
       * ferdFactory.getAvailableModules
       *
       * @description Sends a GET request to server for all available modules.
       * @return {Object} response data
       */
      function getAvailableModules(data) {
        return $http.get('/api/users/modules', data)
          .then(function(response) {
            return response;
          });
      }

      /**
       * ferdFactory.verifyKey
       * 
       * @description Verifies if slack api key is valid and if it is, that it
       *   belongs to the same org as user's submission.
       * @param {String} apikey The API key to check
       * @return {Object} A promise object
       */
      function verifyKey(apikey) {
        var url = 'https://slack.com/api/rtm.start?token=' + apikey;
        return $http.get(url)
          .then(function(response) {
            return $q(function(resolve, reject) {
              if(response.data && response.data.team &&
                response.data.team.domain === authFactory.authUser.slackOrganization) {
                resolve(true);
              } else {
                reject(false);
              }
            });
          })
          .catch(function(error) {
            throw error.data;
          });
      }

    }

})();
