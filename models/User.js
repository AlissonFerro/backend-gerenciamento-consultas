const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minLength: 3
    },
    lastname: {
        type: String,
        require: true,
        minLength: 3
    },
    password: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        require: true,
        minLength: 12
    }, 
    CRM: {
        type: String,
        require: false
    },
    first_access: {
        type: Boolean,
        require: true
    },
    adm: {
        type: Boolean,
        require: true
    }
})

const User = mongoose.model('User', userShema);

exports.User = User;