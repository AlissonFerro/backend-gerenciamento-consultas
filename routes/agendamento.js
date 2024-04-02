const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controller/Agendamento');

router
    .get('/:id', AgendamentoController.getAllByDoctor)
    .post('/:user_id', AgendamentoController.createConsultation)
    
module.exports = router