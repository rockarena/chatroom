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

function getMessages(partner, date, sortby) {
  return connectDB()
  .then(function(connection){
    var query = 'select messasges.message, users.name from messages,users left join users on (messages.user_id = users.id)';
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
  getMessages: getMessages
};
