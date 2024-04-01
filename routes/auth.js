const express = require('express');
const router = express.Router();
const AuthController = require('../controller/Auth');

router
    .post('/login', AuthController.login)
    .post('/register', AuthController.register)
module.exports = router