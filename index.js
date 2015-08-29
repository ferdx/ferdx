var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

var publicDIR = path.join(__dirname, '/public');
app.use(express.static(publicDIR));

app.get('/', function(request, response) {
  response.redirect('/index.html');
});

app.listen(app.get('port'), function() {
  // console.log('Node app is running on port', app.get('port'));
});
