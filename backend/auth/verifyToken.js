var jwt = require('jsonwebtoken');
var config = require('../config');

function verifyToken(req, res, next) {
    console.log(req.headers);

    //retrieve authorization header's content
    var token = req.headers['authorization'];
    console.log(token);

    //process the token
    if (!token || !token.includes('Bearer')) {
        res.status(403);
        return res.send({ auth: 'false', message: 'Not authorized!' });
    }

    else {
        //obtain the token's value
        token = token.split('Bearer ')[1]; 
        console.log(token);

        jwt.verify(token, config.key, function (err) {
            if (err) {
                res.status(403);
                return res.send({ auth: false, message: 'Not authorized!' });
            }

            else {
                next();
            }
        });
    }
}

module.exports = verifyToken;