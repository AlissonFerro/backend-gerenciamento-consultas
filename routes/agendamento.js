const express = require('express');
const router = express.Router();
const AgendamentoController = require('../controller/Agendamento');

router
    .get('/:id', AgendamentoController.getAllByDoctor)
    .get('/consultations/:id', AgendamentoController.getConsultations)
    .get('/session/:id', AgendamentoController.getSessionTime)
    .get('/:id/:date', AgendamentoController.getConsultationByDay)
    .post('/:user_id', AgendamentoController.createConsultation)
    .post('/confirm-presence/:id', AgendamentoController.confirmPresence)
    
module.exports = router