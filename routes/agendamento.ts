import express from 'express';
import ConsultationMiddleware from '../middleware/Consultation';
const agendamentoRouter = express.Router();
const AgendamentoController = require('../controller/Agendamento');

agendamentoRouter
    .get('/:id', AgendamentoController.getAllByDoctor)
    .get('/consultations/:id', AgendamentoController.getConsultations)
    .get('/session/:id', AgendamentoController.getSessionTime)
    .get('/:id/:date', AgendamentoController.getConsultationByDay)
    .get('/doctor/:id/:date', AgendamentoController.getConsultationByDayForDoctor)
    
    .post('/:user_id', 
        ConsultationMiddleware.validateBody, 
        AgendamentoController.createConsultation
    )
    .post('/confirm-presence/:id', AgendamentoController.confirmPresence)
    
export default agendamentoRouter