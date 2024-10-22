import mongoose from "mongoose";
const { patientSchema } = require('./Patient');
const { userSchema } = require('./User');

const consultationSchema = new mongoose.Schema({
    date: {
        type: Date,
        require: true
    },
    hour: {
        type: String,
        require: true 
    },
    confirmed_presence: {
        type: Boolean 
    },
    patient: {
        type: patientSchema
    },
    doctor: {
        type: userSchema,
        require: true
    }
});

export const Consultation = mongoose.model('Consultation', consultationSchema);