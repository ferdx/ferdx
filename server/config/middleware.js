var path = require('path');
var morgan = require('morgan');
var bodyParser = require('body-parser');

module.exports = function (app, express) {
  // set up basic middleware
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.join(__dirname + '/../../client')));

  // define routers
  var getferdRouter = express.Router();

  // api paths for various routes
  app.use('/api/getferd', getferdRouter);

  // require necessary route files
  require('../api/getferd/getferdRoutes.js')(getferdRouter);
};