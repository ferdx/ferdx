var userController = require('./userController.js');

module.exports = function (app) {
  app.post('/signup', userController.signup);
  app.post('/login', userController.login);
  app.post('/update', userController.update);
  app.post('/deleteuser', userController.deleteUser);
  app.post('/getauthuser', userController.getAuthUser);
  app.get('/modules', userController.getAvailableModules);
};
