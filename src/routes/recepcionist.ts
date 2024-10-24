import express from 'express';
import RecepcionistController from '../controller/Recepcionist';
import RecepcionistMiddleware from '../middleware/Recepcionist';
const recepcionistRouter = express.Router();

recepcionistRouter
    .get('/:id', RecepcionistController.getRecepcionists)
    .post('/:id', 
        RecepcionistMiddleware.validateBody, 
        RecepcionistController.create
    )

export default recepcionistRouter;