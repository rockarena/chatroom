var mysql = require('promise-mysql');
var config = require('./config');

function connectDB() {
  return mysql
    .createConnection(config.database).then(function(connection) {
      return connection;
    })
    .error(function(err) {
      console.log('db error', err);
      if (err.code === 'PROTOCOL_CONNECTION_LOST') {
        connectDB();
      } else {
        throw err;
      }
    });
}
function addMessage(user, message) {
  return connectDB()
  .then(function(connection){
    var query = 'insert into messages (user, message) values (' + connection.escape(user) + ',' + connection.escape(message) +')';
    return connection.query(query);
  })
  .then(function(response){
      return {user: user, message: message}
  })
  .catch(function(err){
    console.log(err)
  })
}


function getMessages() {
  return connectDB()
  .then(function(connection){
    var query = 'select message,user from messages ';
    return connection.query(query);
  })
  .then(function(rows) {
    return rows;
  })
  .catch(function(e) {
    console.log(e);
  });
}

module.exports = {
  getMessages: getMessages,
  addMessage: addMessage
};
