'use strict';

var path = require('path');

const express = require('express');
const router = express.Router();


router.get('/room/:game_uuid', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'chess-react', 'build', 'index.html'));
});

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'chess-react', 'build', 'index.html'));
});



module.exports = router;