var mysql = require('mysql2');

var mySqlConfig = {
  host: 'localhost',
  database: 'chat',
  user: 'root',
  password: 'Marcos2003#$',
  port: 3306
};

function execute(query){
  var connection = mysql.createConnection(mySqlConfig);
  return new Promise((resolve, reject) => {
    connection.query(query, function (error, results) {
      if (error) {
        reject(error);
      }
      resolve(results);
    });
    connection.end();
  });
}

module.exports = {
  execute
};