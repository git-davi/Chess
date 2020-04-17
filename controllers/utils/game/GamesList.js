'use strict';

const Game = require('./Game');

class GamesList {
    constructor() {
        this.games = new Map();
    }
    

    createGame(game_uuid, username) {
        this.games.set(
            game_uuid,
            new Game(
                game_uuid,
                username
            )
        );
    }


    deleteGame(game_uuid) {
        this.games.delete(game_uuid);
    }


    addToGame(game_uuid, username) {
        this.games.get(game_uuid).addPlayer(username);
    }

    getGame(game_uuid) {
        return this.games.get(game_uuid);
    }
}

var gamesList = new GamesList();

module.exports = gamesList;