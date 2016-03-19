var express = require('express');
var api = require('./api.js');
var bodyParser = require('body-parser')

app = express();
app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/allmessages', function(req, res) {
  api.getMessages()
    .then(function(result) {
      return res.send({
        messages: result
      });
    });
});

app.post('/message', function(req, res) {
  var user = req.body.user;
  var message = req.body.message;

  api.addMessage(user, message)
    .then(function(message) {
      console.log(message);
      res.send(message)
    });
});

app.listen(3000, function() {
  console.log('server running on - localhost:3000');
});
