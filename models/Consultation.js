const mongoose = require('mongoose');
const { patientSchema } = require('./Patient');
const { userSchema } = require('./User');

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
    },
    doctor: {
        type: userSchema,
        require: true
    }
});

const Consultation = mongoose.model('Consultation', consultationSchema);

module.exports = Consultation;