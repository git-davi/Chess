'use strict';

const tokenHandler = require('./tokenHandler');
const dbop = require('./utils/db/operations');


module.exports.checkUser = async (req, res) => {
    let exists = await dbop.existUser(req.params.username);

    if (exists) {
        res.json({
            type: 'error',
            value: 'Username already taken'
        });
    }
    else {
        res.json({
            type: 'success',
            value: 'Username valid'
        });
    }
};


module.exports.submitLogin = async (req, res) => {
    const {username, password} = req.body;
    
    const user = await dbop.getUser(username, password);

    if (user == -1) {
        res.json({
            type: 'error',
            value: 'Server side error'
        });
    }
    else if (user == undefined) {
        res.json({
            type: 'error',
            value: 'Wrong username or password'
        });
    } 
    else {
        let token = tokenHandler.createToken(username);
        res.json({
            type: 'success',
            value: 'Login Successfull',
            token: token
        });
    }
};


module.exports.submitRegistration = async (req, res) => {
    const {username, password, email} = req.body; 

    let exists = await dbop.existUser(username);

    if (exists) {
        res.json({
            type: 'error',
            value: 'Username already taken'
        });
        return;
    }

    let created = await dbop.createUser(username, password, email);

    if (created == undefined) {
        res.json({
            type: 'error',
            value: 'Registration failed, retry later'
        })
    }
    else {
        let token = tokenHandler.createToken(username);
        res.json({
            type: 'success',
            value: 'Registration Successfull',
            token: token
        });
    }
};