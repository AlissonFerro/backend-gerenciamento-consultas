const express = require('express');
const router = express.Router();
const RecepcionistController = require('../controller/Recepcionist');

router
    .get('/:id', RecepcionistController.getRecepcionists)
    .post('/:id', RecepcionistController.create)

module.exports = router;