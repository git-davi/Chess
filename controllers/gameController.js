'use strict';

const queue = require('./utils/queue/Queue');
const dbop = require('./utils/db/operations');


module.exports.getUserInfo = async (req, res) => {
    const result = await dbop.getUserInfo(req.params.username);
    switch (result) {
        case null:
            res.status(404).json({
                message: 'User not found'
            });
            break;
        case undefined:
            res.status(500).json({
                message: 'Server side error'
            });
            break;
        default:
            res.status(200).json({
                username: result.username,
                elo: result.elo
            });
    }
};


module.exports.getUserGames = async (req, res) => {
    const result = await dbop.getGames(res.locals.token.username)
    .catch(() => -1);
    
    if (result === -1) {
        res.status(401).json({
            message: 'You need to register again, your account has been deleted'
        });
        return;
    }

    var games = result.map(e => e.game_uuid);

    res.status(200).json({
        games: games
    });
}


// In this methods I pass a callback function beacause
// I want all the response logic in this page
module.exports.startMatchmaking = (req, res) => {

    if(queue.hasTicket(res.locals.token)) {
        // needed for consistency after page refresh. 
        // Browser aborts previous request
        queue.setNewResponse(
            res.locals.token.username, 
            res, 
            (res) => res.status(409).json({
                message: 'Replaced by newer request'
            })
        );        
        return;
    }

    queue.searchTicket(
        res.locals.token.username, 
        res,
        (res, game_uuid) => res.status(201).json({
            message: "Game found",
            game_uuid: game_uuid
        })
    );
};


// MUST be async. Being a promise will increase the chance that cannot
// precede startMatchmaking from the same user (also this has a lower priority) 
module.exports.stopMatchmaking = async (req, res) => {
    // this response will go to startMatchmaking request
    queue.stopMatchmaking(
        res.locals.token, 
        (res) => res.status(404).json({
            message: "Your queue ticket has been deleted"
        }) 
    );
    res.status(200).json({
        message: "Queue ticket deleted"
    });
};


module.exports.getGamePlayers = async (req, res) => {
    let game = await dbop.getGame(req.params.game_uuid);
    if (game === undefined) {
        res.status(403).json({
            message: 'You cannot access this resource, probably doesn\'t exists anymore'
        });
        return;
    }
    if(!game.hasPlayer(res.locals.token.username) ) {
        res.status(403).json({
            message: 'You cannot access this resource'
        });
        return;
    }

    res.status(200).json({
        white: game.white,
        black: game.black
    });
};


module.exports.getGameState = async (req, res) => {
    let game = await dbop.getGame(req.params.game_uuid);
    if (game === undefined) {
        res.status(403).json({
            message: 'You cannot access this resource, probably doesn\'t exists anymore'
        });
        return;
    }
    if(!game.hasPlayer(res.locals.token.username) ) {
        res.status(403).json({
            message: 'You cannot access this resource'
        });
        return;
    }

    res.status(201).json({
        turn: game.turn,
        chessboard: game.chessboard
    });
}


module.exports.surrendGame = async (req, res) => {

    const result = await dbop.deleteGame(req.params.game_uuid);
    
    if (result === 0)
        res.status(404).json({
            message: 'game not found'
        });
    if (result === undefined)
        res.status(500).json({
            message: 'failed to delete'
        });

    res.status(200).json({
        message: 'game surrended with success'
    });
}
