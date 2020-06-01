'use strict';

const crypto = require('crypto');
const UserModel = require('../../../models/UserModel');
const GameModel = require('../../../models/GameModel');
const Game = require('./Game');


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
            password: crypto.createHash('sha256').update(pass).digest('hex')
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

    let p1Games = await user.getGamesAsWhite()
    .then((res) => res == undefined? [] : res)
    .catch(() => []);
    
    let p2Games = await user.getGamesAsBlack()
    .then((res) => res == undefined? [] : res)
    .catch(() => []);
    
    return p1Games.concat(p2Games);
};



module.exports.getGame = async (game_uuid) => {
    const result = await GameModel.findByPk(game_uuid)
    .catch(() => null);

    try {
        return new Game(result);
    }
    catch (err) {
        return undefined;
    }
}


module.exports.setGameState = (game_uuid, turn, chessboard) => {
    GameModel.update({
        turn: turn,
        chessboard: chessboard
    }, {
        where: { game_uuid: game_uuid }
    });
}


module.exports.existUser = async (username) => {
    const result = await UserModel.findByPk(username)
    .catch(() => undefined);

    return result != undefined;
}


module.exports.createUser = async (user, pass, email) => {
    return await UserModel.create({
        username: user,
        password: crypto.createHash('sha256').update(pass).digest('hex'),
        email: email
    }).catch(() => {
        return undefined;
    });
}


module.exports.createGame = async (game_uuid, player_1, player_2) => {
    return await GameModel.create({
        game_uuid: game_uuid,
        white: player_1,
        black: player_2,
        turn: player_1,
        chessboard: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1'
    }).catch(() => {
        return undefined;
    });
}


module.exports.deleteGame = async (game_uuid) => {
    return await GameModel.destroy({
        where : {
            game_uuid: game_uuid
        }
    })
    .catch(() => undefined)
}