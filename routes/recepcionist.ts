import express from 'express';
const recepcionistRouter = express.Router();
const RecepcionistController = require('../controller/Recepcionist');

recepcionistRouter
    .get('/:id', RecepcionistController.getRecepcionists)
    .post('/:id', RecepcionistController.create)

export default recepcionistRouter;