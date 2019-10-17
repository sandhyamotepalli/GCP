// JWT
let jwt = require('jsonwebtoken');
let middleware = require('../middleware');

var myInit = function (req, res, next) 
{
	res.header('Access-Control-Allow-Origin', '*');
	middleware.checkToken(req, res, next);
}

app.use(myInit)


// After login

const token = jwt.sign({account}, config.jwt_secret_key, { expiresIn: '2h' });  // here account is an object having the user details like id, name, email , few other details whic are required