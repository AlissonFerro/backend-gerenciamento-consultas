import mongoose from "mongoose";
import { patientSchema } from "./Patient";
import { userShema } from "./User";

export const consultationSchema = new mongoose.Schema({
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
        type: userShema,
        require: true
    }
});

export const Consultation = mongoose.model('Consultation', consultationSchema);