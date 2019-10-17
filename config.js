var  mysql      = require('mysql');

var  connection = mysql.createConnection({
  host     : 'localhost',
  port     : '3306',
  user     : 'root',
  password : '',
  database : 'GCPTest'
});
connection.connect(function(err){
if(!err) {
    console.log("Database is connected");
} else {
    console.log(err);
    console.log("Error while connecting with database");
}
});
module.exports = connection;