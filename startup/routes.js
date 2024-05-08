const express = require('express');
const auth = require('../routes/auth');
const agendamento = require('../routes/agendamento');
const recepcionist = require('../routes/recepcionist');

module.exports = (app) => {
    app 
        .use(express.json())
        .use('/api/auth', auth)
        .use('/api/agendamento', agendamento)
        .use('/api/recepcionists', recepcionist)
}