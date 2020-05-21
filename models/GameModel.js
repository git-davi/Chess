'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../controllers/utils/db/connection');

const UserModel = require('./UserModel');

const GameModel = sequelize.define('games', {
    game_uuid: {
        type: DataTypes.UUID,
        primaryKey: true
    },
    turn: {
        type: DataTypes.STRING
    },
    chessboard: {
        type: DataTypes.STRING
    }
});

UserModel.hasMany(GameModel, { 
    foreignKey: 'white',
    as: 'GamesAsWhite' 
});

UserModel.hasMany(GameModel, { 
    foreignKey: 'black',
    as: 'GamesAsBlack' 
});

module.exports = GameModel;