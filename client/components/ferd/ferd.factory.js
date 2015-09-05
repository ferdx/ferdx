
/**
 * Factory for interfacing with FerdX server for all available modules
 * with MegaFerd server.
 */
(function() {

  angular
    .module('app')
    .factory('ferdFactory', ferdFactory);

    function ferdFactory($q, $http, authFactory) {

      factory = {
        getAvailableModules: getAvailableModules,
        verifyKey: verifyKey
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

      /**
       * Verifies if slack api key is valid and if it is, that it belongs to
       * the same org as user's submission.
       * @param {String} apikey to check
       * @return {Promise}
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
      };

    }

})();
