// load up .env as soon as possible
require('dotenv').load();

var cred = process.env.MONGOLAB_CRED;
var dbhost = process.env.MONGOLAB_HOST;
var dbport = process.env.MONGOLAB_PORT;
var dbname = process.env.MONGOLAB_DBNAME;
var dburi = 'mongodb://' + cred + '@' + dbhost + ':' + dbport + '/' + dbname;

// connect and fire up
var mongoose = require('mongoose').connect(dburi);
var app = require('./config/server.js');

// listen
app.listen(app.get('port'));