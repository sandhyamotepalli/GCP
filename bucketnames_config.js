let mysql = require('mysql');
let config = require('./config');
 
let connection = mysql.createConnection(config);
 
let sql = `SELECT * FROM userlogin`;
connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }else{
        console.log(results);
        results.forEach(customers => {
            console.log(customers.customername);

            const bucketName = customers.customername;
              

          });
    }
    
  });
connection.end();
