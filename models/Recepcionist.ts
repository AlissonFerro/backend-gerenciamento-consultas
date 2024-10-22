import mongoose from "mongoose";

export const recepcionistShema = new mongoose.Schema({
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

export const Recepcionist = mongoose.model('Recepcionist', recepcionistShema);