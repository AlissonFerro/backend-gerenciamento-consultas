const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    name: String,
    lastname: String,
    password: String,
    cpf: String, 
    CRM: String,
})

const User = mongoose.model('User', userShema);

exports.User = User;