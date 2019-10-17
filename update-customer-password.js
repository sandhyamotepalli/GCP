var connection = require('./config');
var bcrypt = require('bcryptjs');
module.exports.change = (req, res, next) => {
    if (req.body.newpassword === req.body.confirmpassword){
          let user = {
                id : req.user.id,
                new : req.body.newpassword
            };
        users.changePassword(user, (err, result)=> {
            if (err) {
                if (err.code === 'BAD_PASSWORD') {
                    console.log('Please enter passwords correctly.');
                    res.redirect("/");
                } else {
                   next(err); // pass the error to the next handler
                }
            } else {
                res.redirect("/");
            }
        });
        res.redirect("/");
    }else{
        res.redirect("/change-password");
    }
};

//model
module.exports.changePassword = (user, callback) => {
            if (user != null){
                bcrypt.hash(user.new, saltRounds, function (er, hash) {
                    if (er) return callback(er); // and this one!!
                    db.query("UPDATE userlogin SET password=? WHERE userid=?", [hash, user.id], callback);
                });
                res.sendFile('login.html');
            }else {
              // that's not good, send an error to the caller
              var err = new Error('Password does not match');
              err.code = 'BAD_PASSWORD';
              callback(err);
            }

};