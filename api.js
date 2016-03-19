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
  var user_id;
  return connectDB()
  .then(function(connection){
    var query = 'select id from users where name =' + connection.escape(user);
    return connection.query(query);
  })
  .then(function(response){
    if (response.length > 0) {
      user_id = response[0].id;
      return _insertMessage(user_id,message)
    }
  })
  .catch(function(err){
    console.log(err)
  })
}

function _insertMessage(user_id, message) {
  return connectDB()
  .then(function(connection){
    var query = 'insert into messages (user_id, message) values (' + connection.escape(user_id) + ',' + connection.escape(message) +')';
    return connection.query(query);
  })
  .then(function(response){
    return {user_id:user_id, message:message}
  })
  .catch(function(err){
    console.log(err)
  })
}

function getMessages(partner, date, sortby) {
  return connectDB()
  .then(function(connection){
    // var query = 'select * from messages';
    var query = 'select messages.message, users.name from messages left join users on (messages.user_id = users.id)';
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
