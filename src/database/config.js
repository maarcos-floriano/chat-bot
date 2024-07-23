var mysql = require('mysql2');

var mySqlConfig = {
  host: process.env.DB_HOST || 'localhost',
  database:   process.env.DB_DATABASE || 'banco',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: 3306
};

function execute(query){
  var connection = mysql.createConnection(mySqlConfig);
  return new Promise((resolve, reject) => {
    connection.query(query, function (error, results) {
      if (error) {
        reject(error);
      }
      console.log(results);
      resolve(results);
    });
    connection.end();
  });
}

module.exports = {
  execute
};