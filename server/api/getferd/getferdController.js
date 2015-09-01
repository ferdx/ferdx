var qs = require('querystring');
var request = require('request');
var _ = require('underscore');

module.exports = {

  /**
   * access()
   * 
   * @param {Object} 
   * @param {Object} 
   * @param {Function} 
   */
  access: function(req, res, next) {
    
    var params = _.extend(req.body, {
      client_id: process.env.FERDX_CLIENT_ID,
      client_secret: process.env.FERDX_CLIENT_SECRET
    });

    var querystring = qs.stringify(params);
    var path = 'https://slack.com/api/oauth.access?' + querystring;

    request.get(path, function(error, response, body) {
      res.send(body);
    });

  },

  /**
   * addFerd()
   * 
   * @param {Object} 
   * @param {Object} 
   * @param {Function} 
   */
  addFerd: function(req, res, next) {

    var params = {
      token: 'xoxp-9950811712-9951186599-9965532292-2db400',
      channel: 'C09TZ5L87',
      user: 'U09PM5Q06'
    };

    // var params = {
    //   token: 'xoxp-9950811712-9951186599-9965532292-2db400'
    // };

    var querystring = qs.stringify(params);
    var path = 'https://slack.com/api/channels.invite?' + querystring;
    // var path = 'https://slack.com/api/channels.list?' + querystring;

    request.post(path, function(error, response, body) {
      console.log(body);
      res.end();
    });
  }

};