var getferdController = require('./getferdController.js');

module.exports = function(app) {
  app.post('/access', getferdController.access);
  app.get('/addferd', getferdController.addFerd);
};