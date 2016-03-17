var express = require('express');
var api = require('./api.js');

app = express();

app.get('/allmessages', function(req, res) {
  api.getMessages()
    .then(function(result) {
      return res.send({
        messages: result
      });
    });
});

app.get('/message', function(req, res) {
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
