/**
 * The getFerdFactory
 */
(function() {

  'use strict';

  /**
   * Require the base level module and factory function
   */
  angular
    .module('app')
    .factory('getFerdFactory', getFerdFactory);

  /**
   * getFerdFactory is where all the actual factory functionality resides.
   */
  function getFerdFactory($http) {
    
    var factory = {
      access: access,
      addFerd: addFerd
    };

    return factory;
    
    ////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////

    /**
     * access() generates access to slack
     * 
     * @param {Object} post data
     * @return {Object} response data
     */
    function access(data) {
      return $http.post('/api/getferd/access', data)
        .then(function(response) {
          return response;
        });
    }

    /**
     * addFerd() adds ferd to the slack organization
     *
     * @return {Object} response data
     */
    function addFerd() {
      return $http.get('/api/getferd/addferd')
        .then(function(response) {
          return response;
        });
    }

  }

})();