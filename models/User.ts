import mongoose from "mongoose";

export const userShema = new mongoose.Schema({
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
    },
    admAccont: {
        type: Boolean,
        require: true
    },
    start_time: {
        type: Number,
        require: false
    },
    finish_time: {
        type: Number,
        require: false
    },
    session_time: {
        type: Number,
        require: false
    },
    consultations: {
        type: [],
        require: true
    },
    vacation: {
        type: [],
        require: false
    },
    not_avaliable_consultation:{
        type: []
    },
    recepcionists: {
        type: [],
        require: true
    }
})

export const User = mongoose.model('User', userShema);