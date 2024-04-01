const mongoose = require('mongoose');
const { patientSchema } = require('./Patient');

const consultationSchema = new mongoose.Schema({
    time: {
        type: Date,
        require: true
    },
    hour: {
        type: String,
        require: true 
    },
    patient: {
        type: patientSchema
    }
});

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;