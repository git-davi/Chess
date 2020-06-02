'use strict';

const express = require('express');
const router = express.Router();
const tokenHandler = require('../controllers/tokenHandler');
const gameController = require('../controllers/gameController');

// this route must be authorized
router.use(tokenHandler.extractToken);
router.use(tokenHandler.verifyToken);
router.use(tokenHandler.decodeToken);


router.get('/user/:username', gameController.getUserInfo);
router.get('/games', gameController.getUserGames);
router.get('/matchmaking/start', gameController.startMatchmaking);
router.get('/matchmaking/stop', gameController.stopMatchmaking);
router.get('/info/players/:game_uuid', gameController.getGamePlayers);
router.get('/info/state/:game_uuid', gameController.getGameState);

router.delete('/surrend/:game_uuid', gameController.surrendGame)


module.exports = router;