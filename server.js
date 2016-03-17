var express = require('express');
var api = require('./api.js');

app = express();
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);
app.get('/allmessages', function(req, res) {
  api.getMessages()
    .then(function(result) {
      return res.send({
        messages: result
      });
    });
});

app.get('/message', function(req, res) {
	var user = req.param('user');
  var message = req.param('message');
  api.addMessasge(user, message)
    .then(function(result) {
      return res.send({
        status: result
      });
    });
});

app.listen(3000, function() {
  console.log('server running on - localhost:3000');
});
