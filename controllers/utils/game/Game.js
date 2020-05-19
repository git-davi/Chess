'use strict';
const io = require('../../webSocket').io;
// un game è identificato da un uuid

class Game {
    constructor(game_uuid, username) {
        this.game_uuid = game_uuid;
        this._assignColor(username);

        io.on('connection', (socket) => {
            socket.join(game_uuid);
            console.log('joined room ' + game_uuid);
        });

        io.to(game_uuid).emit('welcome to the channel ' + game_uuid);
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
}

module.exports = Game;