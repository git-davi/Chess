'use strict';


// un ticket è identificato dall'username, significa che 
// un utente può fare solo un ticket alla volta
// altrimenti potrebbe intasare la coda

class Ticket {
    constructor(username, elo, game_uuid, res) {
        this.username = username;
        this.elo = elo;
        this.game_uuid = game_uuid;
        this.res = res;
    }

    canPlay(userInfo) {
        return Math.abs(this.elo - userInfo.elo) < 100;
    }
}

module.exports = Ticket;