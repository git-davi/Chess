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
router.get('/info/:game_uuid', gameController.getGameInfo);

// ------- old --- pre api -----

router.get('/', gameController.index);
router.get('/play/:game_uuid', gameController.isMyGameMiddleware);

router.get('/matchmaking', gameController.matchmaking);
router.get('/matchmaking/start', gameController.startSearch);
router.get('/matchmaking/stop', gameController.stopSearch);

router.get('/play/:game_uuid', gameController.playGame);

module.exports = router;