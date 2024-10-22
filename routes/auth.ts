import express from 'express';
const authRouter = express.Router();
const AuthController = require('../controller/Auth');

authRouter
    .get('/', AuthController.getDoctors)
    .get('/vacation/:id', AuthController.getVacation)
    .post('/login', AuthController.login)
    .post('/register', AuthController.register)
    .put('/:id', AuthController.modify)
    .post('/reset-password', AuthController.resetPassword)
    .post('/:id/vacation', AuthController.createVacation)

export default authRouter