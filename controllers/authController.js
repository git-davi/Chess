'use strict';

const tokenHandler = require('./tokenHandler');
const dbop = require('./utils/db/operations');


module.exports.checkUser = async (req, res) => {
    let exists = await dbop.existUser(req.params.username);

    if (exists) {
        res.status(200).json({
            message: 'Username found'
        });
    }
    else {
        res.status(404).json({
            message: 'Username not found'
        });
    }
};


module.exports.submitLogin = async (req, res) => {
    const {username, password} = req.body;
    
    const user = await dbop.getUser(username, password);

    switch (user) {
        case undefined:
            res.status(500).json({
                message: 'Server side error'
            });
            break;
        case null:
            res.status(401).json({
                message: 'Wrong username or password'
            });
            break;
        default:
            let token = tokenHandler.createToken(username);
            res.status(200).json({
                message: 'Login Successfull',
                token: token
            });
    }
};


module.exports.submitRegistration = async (req, res) => {
    const {username, password, email} = req.body; 

    let exists = await dbop.existUser(username);

    if (exists) {
        res.status(409).json({
            message: 'Username already exists'
        });
        return;
    }

    let created = await dbop.createUser(username, password, email);

    if (created == undefined) {
        res.status(500).json({
            message: 'Registration failed, retry later'
        })
    }
    else {
        let token = tokenHandler.createToken(username);
        res.status(201).json({
            message: 'Registration Successfull',
            token: token
        });
    }
};