const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controller/Agendamento');

router
    .get('/:id', AgendamentoController.getAllByDoctor)

module.exports = router