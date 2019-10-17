var connection = require('./../config');
var bcrypt = require('bcryptjs');
module.exports.register=function(req,res){
    var today = new Date();
    var users={
        "customername":req.body.name,
        "mailid":req.body.email,
        "contactnumber":req.body.number,
        //"password":req.body.password,
        "userrole":req.body.role,
        "creationdatetime":today,
        "lastlogintime":today
    }
  
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(req.body.password, salt, function(err, hash) {
          // Store hash in your password DB.
          users += "password"+":"+hash;
      });
  });
    connection.query('INSERT INTO userlogin SET ?',users, function (error, results, fields) {
      if (error) {
        alert('there are some error with query');
       /* res.json({
            status:false,
            message:'there are some error with query'
        })*/
        res.sendFile('registration.html');
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
        res.sendFile('registration.html');
      }
    });
}
