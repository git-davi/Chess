'use strict';

const UserModel = require('../../../models/UserModel');
const GameModel = require('../../../models/GameModel');


module.exports.modelsGen = function* (games) {
    for (let game of games) {
        yield game.game_uuid;
    }
}

module.exports.getUserInfo = async (username) => {
    const result = await UserModel.findOne({
        attributes: ['username', 'elo'],
        where : {
            username: username
        }
    })
    .catch(() => undefined );

    return result;
}


module.exports.getUser = async (user, pass) => {
    const result = await UserModel.findOne({
        where : {
            username: user,
            password: pass
        }
    })
    .catch(() => undefined );

    return result;
}

module.exports.getGames = async (username) => {
    const user = await UserModel.findByPk(username)
    .then((res) => {
        if (res === undefined)
            throw new Error();
        return res;
    })
    .catch((err) => {
        throw err;
    });

    let p1Games = await user.getGamesAsPlayer1()
    .then((res) => res == undefined? [] : res)
    .catch(() => []);
    
    let p2Games = await user.getGamesAsPlayer2()
    .then((res) => res == undefined? [] : res)
    .catch(() => []);
    
    return p1Games.concat(p2Games);
};


module.exports.existUser = async (username) => {
    const result = await UserModel.findByPk(username)
    .catch(() => undefined);

    return result != undefined;
}


module.exports.createUser = async (user, pass, email) => {
    return await UserModel.create({
        username: user,
        password: pass,
        email: email
    }).catch(() => {
        return undefined;
    });
}


module.exports.createGame = async (game_uuid, player_1, player_2) => {
    return await GameModel.create({
        game_uuid: game_uuid,
        player_1: player_1,
        player_2: player_2
    }).catch(() => {
        return undefined;
    });
}