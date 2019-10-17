var connection = require('./../config');
var bcrypt = require('bcryptjs');
module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    var sess;
    connection.query('SELECT * FROM userlogin WHERE mailid = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
        if(results.length >0){
            if(password==results[0].password){     
                  
                if(results[0].userrole != null && results[0].userrole == 'admin'){
                      res.redirect("/adminhome");
                }
                else if(results[0].userrole != null && results[0].userrole == 'employee'){
                  res.redirect("/employeehome");
                }
                else{
                  res.json({
                    status:true,
                    message:"Successfully Login"  
                })
                  res.render("/customer");
                }     
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
          /*  bcrypt.compare(password, results[0].password, function(err, ress) {
                if(!ress){
                    res.json({
                      status:false,                  
                      message:"Email and password does not match"
                    });
                }else{
                  sess=req.session;
                  sess.mailid; 
                  sess.userid; 
                  if(results[0].userrole != null && results[0].userrole == 'admin'){
                        res.redirect("/adminhome");
                  }
                  else if(results[0].userrole != null && results[0].userrole == 'employee'){
                    res.redirect("/employeehome");
                  }
                  else{
                    res.redirect("/customerhome");
                  }                
                    res.json({
                        status:true,
                        message:"Successfully Login"  
                    })
                }
            }); */  
         
        }
        else{
          res.json({
              status:false,    
            message:"Email does not exits"
          });
        }
      }
    });
}
