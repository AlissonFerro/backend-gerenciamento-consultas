import express from 'express';
import AuthController from '../controller/Auth';
import AuthMiddleware from '../middleware/Auth';

const authRouter = express.Router();

authRouter
    .get('/', AuthController.getDoctors)
    .get('/vacation/:id', AuthController.getVacation)
    .post('/login', AuthController.login)
    .post('/register', AuthController.register)
    .put('/:id', AuthController.modify)

    .post('/reset-password', 
        AuthMiddleware.validateBody, 
        AuthController.resetPassword
    )
    .post('/:id/vacation', AuthController.createVacation)

export default authRouter