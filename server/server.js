// boot up express express and mongoose
var express = require('express');
var app = express();

// configure our server with all the middleware
require('./config/middleware.js')(app, express);

// set port
app.set('port', (process.env.PORT || 5000));

// listen
app.listen(app.get('port'));

// export our app for testing and flexibility
module.exports = app;