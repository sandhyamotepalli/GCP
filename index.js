var http = require("http");
var express=require("express");
const jwt = require('jsonwebtoken');

var bodyParser=require('body-parser');
var app = express();

var authenticateController=require('./controllers/authenticate-controller');
var registerController=require('./controllers/register-controller');
var passwordController=require('./update-customer-password');
var customerHome = require('./customerhome');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
/* route to handle login and registration */
app.get('/', function(req, res){
  res.sendFile('login.html', { root: __dirname})
});

app.post('/submit',registerController.register);
app.post('/authenticate',authenticateController.authenticate);
app.post('/change',passwordController.change);
app.post('/customer',customerHome.getBuckets);
// Running Server Details.
var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at %s:%s Port", host, port)
  });