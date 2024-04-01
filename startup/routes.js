const express = require('express');
const auth = require('../routes/auth');
const agendamento = require('../routes/agendamento');

module.exports = (app) => {
    app 
        .use(express.json())
        .use('/api/auth', auth)
        .use('/api/agendamento', agendamento)
}