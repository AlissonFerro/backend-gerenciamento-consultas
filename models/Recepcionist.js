const mongoose = require('mongoose');

const recepcionistShema = new mongoose.Schema({
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
    doctorId: {
        type: String,
        require: true
    },
    admAccont: {
        type: Boolean,
        require: true
    }
})

const Recepcionist = mongoose.model('Recepcionist', recepcionistShema);

exports.Recepcionist = Recepcionist;
exports.recepcionistShema = recepcionistShema;