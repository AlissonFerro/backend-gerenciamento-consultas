const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controller/Agendamento');

router
    .get('/:id', AgendamentoController.getAllByDoctor)
    .get('/session/:id', AgendamentoController.getSessionTime)
    .post('/:user_id', AgendamentoController.createConsultation)
    .get('/:id/:date', AgendamentoController.getConsultationByDay)
    
module.exports = router