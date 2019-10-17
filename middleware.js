let jwt = require('jsonwebtoken');
const config = require('./config.js');

let checkToken = (req, res, next) => 
{
    let token = req.headers['x-access-token'] || req.headers['authorization'];

    if(req.url.startsWith('/token/') || req.url.startsWith('/success/'))
    {
        next();
    }
    else if (req.url == '/login' || req.url == '/registration' || req.url == '/adminhome' || req.url == '/customerhome' || req.url == '/file-downlondrequest' || req.url == '/companynames_config' || req.url == '/logout') 
    {
        next();
    }
    else if (token && token.startsWith('Bearer ')) 
    {
        token = token.slice(7, token.length);

        jwt.verify(token, config.jwt_secret_key, (err, decoded) => 
        {
            if (err) 
            {
                return res.json({
                    isAuth: false,
                    status: 0,
                    message: 'Token is not valid',
                });
            }
            else 
            {
                req.decoded = decoded;
                req.authId = decoded.account._id;
                next();
            }
        });
    }
    else 
    {
        return res.json({
            isAuth: false,
            status: 0,
            message: 'Token is not supplied'
        });
    }
};

module.exports = {
    checkToken: checkToken
}