'use strict';

const tokenHandler = require('./tokenHandler');
const dbop = require('./utils/db/operations');


module.exports.auth = (req, res) => {
    // qua dovrà servire l'applicazione react
    //res.render('auth');
};


module.exports.submitLogin = async (req, res) => {
    const {username, password} = req.body;
    
    const user = await dbop.getUser(username, password);

    if (user == -1) {
        res.json({
            error: 'Server side error'
        });
    }
    else if (user == undefined) {
        res.json({
            error: 'Wrong username or password'
        });
    } 
    else {
        const games = [...dbop.modelsGen(await dbop.getGames(user))];
        let token = tokenHandler.createToken(user, games);
        tokenHandler.setToken(res, token);
        res.json({
            success: 'Login successfull'
        });
    }
};


module.exports.submitRegistration = async (req, res) => {
    const {username, password, email} = req.body; 

    let exists = await dbop.existUser(username);

    if (exists) {
        res.json({
            error: 'Username already taken'
        });
        return;
    }

    let created = await dbop.createUser(username, password, email);

    if (created == undefined) {
        res.json({
            error: 'Registration failed, retry later'
        })
    }
    else {
        res.json({
            success: 'Registration successfull'
        });
    }
};