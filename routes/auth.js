'use strict';

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const tokenHandler = require('../controllers/tokenHandler');

router.get('/users/:username', authController.checkUser)

router.post('/login', authController.submitLogin);
router.post('/register', authController.submitRegistration);

module.exports = router;
