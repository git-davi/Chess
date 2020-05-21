'use strict';

// un game è identificato da un uuid


class Game {
    constructor(game_uuid, username) {
        this.game_uuid = game_uuid;
        this._assignColor(username);
        this.chessboard = 'this-should-be-the-initial-state';
    }

    _assignColor(username) {
        if (Math.random() >= 0.5)
            this.white = username;
        else
            this.black = username;
    }

    addPlayer(username) {
        if (this.white == undefined)
            this.white = username;
        else
            this.black = username;
    }

    hasPlayer(username) {
        return (username == this.white)  || (username == this.black);
    }

    setChessboard(chessboard) {
        this.chessboard = chessboard;
        console.log(this.chessboard);
    }
}

module.exports = Game;