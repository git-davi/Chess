'use strict';

const { v4:uuidv4 } = require('uuid');

const tokenHandler = require('../../tokenHandler');
const Ticket = require('./Ticket');
const gamesList = require('../game/GamesList');
const dbop = require('../db/operations');



class Queue {
    constructor() {
        // map instead of object beacause it remember insertion order
        this.queue = new Map();
    }


    async _addTicket(userInfo, game_uuid, res) {
        // imposto la chiave come username -> un utente può fare solo una ricerca alla volta
        this.queue.set(
            userInfo.username, 
            new Ticket(
                userInfo.username,
                userInfo.elo,
                game_uuid,
                res
            )    
        );
    }


    _removeTicket(username) {
        this.queue.delete(username);
    }


    stopMatchmaking(token, stopResponseCallback) {
        let ticket = this.queue.get(token.username);
        if (ticket) {
            gamesList.deleteGame(ticket.game_uuid);
            this._removeTicket(token.username);

            // without response, the client will get really slow!
            stopResponseCallback(ticket.res);
        }
    }

    hasTicket(token) {
        return this.queue.get(token.username) != undefined;
    }

    setNewResponse(username, res, existingResponseCallback) {
        let ticket = this.queue.get(username);

        // again without response client will get slow
        existingResponseCallback(ticket.res);
        ticket.res = res;
    }


    _existsOpponent(userInfo) {
        for (let [username, ticket] of this.queue) {
            if(ticket.canPlay(userInfo))
                return username;
        }
        return undefined;
    }


    async _createGameInstance(res1, res2, game_uuid) {
        await dbop.createGame(
            game_uuid, 
            res1.locals.token.username, 
            res2.locals.token.username
        );
        // if return undefined should be handled
    }


    async searchTicket(username, res, notifyCallback) {
        var userInfo = await dbop.getUserInfo(username);
        var opponent = this._existsOpponent(userInfo);

        if (opponent != undefined) {
            let ticket = this.queue.get(opponent);
            this._removeTicket(opponent);
            await this._createGameInstance(res, ticket.res, ticket.game_uuid);
            gamesList.addToGame(ticket.game_uuid, username);
            this._notifyGameReady(res, ticket.res, ticket.game_uuid, notifyCallback);
        }
        else {
            let game_uuid = uuidv4();
            this._addTicket(userInfo, game_uuid, res);
            gamesList.createGame(game_uuid, username);
        }
    }

    
    _notifyGameReady(res1, res2, game_uuid, notifyCallback) {  
        //tokenHandler.setToken(res1, tokenHandler.addToToken(res1.locals.token, game_uuid));
        notifyCallback(res1, game_uuid);
        notifyCallback(res2, game_uuid);
    }
}

var queue = new Queue();

module.exports = queue;