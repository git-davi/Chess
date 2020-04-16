'use strict';

const jwt = require('jsonwebtoken');

const secretKey = 'SuperSecretChessSpecialKey';


module.exports.extractToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ")[1];
    if (token == undefined) {
        res.send({
            error: 'You need to login'
        });
        return;
    }

    res.locals.tokenString = token;
    next();
}


module.exports.verifyToken = (req, res, next) => {
    try {
        jwt.verify(res.locals.tokenString, secretKey);
        next();
    }
    catch (err) {
        res.json({
            error: 'invalid token'
        });
    }
};


module.exports.decodeToken = (req, res, next) => {
    res.locals.token = jwt.decode(res.locals.tokenString);
    next();
};


module.exports.createToken = (username) => {
    return jwt.sign(
        { username: username }, 
        secretKey,
        {
            // expiresIn: '2h'
        }
    ); 
};


/*
module.exports.hasToken = (req, res, next) => {
    const token = req.cookies.token;

    try {
        jwt.verify(token, secretKey);
        res.json({
            error: 'you already have token'
        });
    }
    catch (err) {
        next();
    }
};
*/