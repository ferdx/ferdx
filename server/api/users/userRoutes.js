var userController = require('./userController.js');

module.exports = function (app) {
  app.post('/signup', userController.signup);
  app.post('/login', userController.login);
  app.post('/logout', userController.logout);
  app.post('/getauthuser', userController.getAuthUser);
  app.post('/updateuserbotmodules', userController.updateUserBotModules);
};