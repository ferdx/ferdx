// boot up express express and mongoose
var express = require('express');
var app = express();

// configure our server with all the middleware
require('./middleware.js')(app, express);

// set port
app.set('port', (process.env.PORT || 5000));

// export our app for testing
module.exports = app;