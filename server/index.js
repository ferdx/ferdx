// load up .env as soon as possible
require('dotenv').load();

var dburi;

if(process.env.ENVIRONMENT === 'PROD') {
  var cred = process.env.MONGOLAB_CRED;
  var dbhost = process.env.MONGOLAB_HOST;
  var dbport = process.env.MONGOLAB_PORT;
  var dbname = process.env.MONGOLAB_DBNAME;
  dburi = 'mongodb://' + cred + '@' + dbhost + ':' + dbport + '/' + dbname;
}
if(process.env.ENVIRONMENT === 'DEV') {
  dburi = 'mongodb://localhost/ferdx';
}

// connect and fire up
var mongoose = require('mongoose').connect(dburi);
var app = require('./config/server.js');

// listen
app.listen(app.get('port'));