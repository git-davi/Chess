'use strict';

const jwt = require('jsonwebtoken');

const secretKey = 'SuperSecretChessSpecialKey';


module.exports.decodeToken = (req, res, next) => {
    res.locals.token = jwt.decode(req.cookies.token);
    next();
};


module.exports.createToken = (username) => {
    return jwt.sign(
        {
            username: username
        }, 
        secretKey,
        {
            // expiresIn: '2h'
        }
    ); 
};


module.exports.verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    try {
        jwt.verify(token, secretKey);
        next();
    }
    catch (err) {
        res.json({
            error: 'invalid token'
        });
    }
};


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
