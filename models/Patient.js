const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
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
    first_consultation: {
        type: Boolean,
        require: true
    },
    agreement: {
        type: String,
        require: false
    },
    agreement_number:{
        type: String,
        require: false
    },
    phone: {
        type: String,
        require: false
    },
    celphone: {
        type: String,
        require: true
    },
    cpf: {
        type: String,
        require: true
    }
});

const Patient = mongoose.model('Patient', patientSchema);

exports.patientSchema = patientSchema;
exports.Patient = Patient;