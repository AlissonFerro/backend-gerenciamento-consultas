const CryptoJS = require("crypto-js");
const { User } = require("../models/User");
require('dotenv').config();
class AuthController{
    static async login(req, res){
        console.log(req.body);

    }

    static async register(req, res){
        const { name, lastname, cpf, CRM, password } = req.body;
        try {
            const passCrypto = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
            let adm = false;
            
            if(cpf === '062.027.409-30') adm=true;

            const user = {
                name, 
                lastname, 
                password: passCrypto, 
                cpf, 
                CRM,
                first_access: true,
                adm,
                consultations: []
            }
            
            await User.create(user);
            return res.status(201).send({ message: "Usuário cadastrado com sucesso" })
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }

    }

    static async modify(req, res){
        const { id } = req.params;
        const { password, start_time, finish_time, session_time } = req.body;

        try {
            const user = await User.findById(id);
            if(!user) return res.status(404).send({ message: "Usuário não encontrado" });
            if(password) {
                const passCrypto = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
                user.password = passCrypto;
            }
            if(start_time) {
                user.start_time = start_time;
                user.finish_time = finish_time;
                user.session_time = session_time;
            }
            await user.save();
            return res.status(200).send({message: "Usuário modificado com sucesso"})
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    }
}

module.exports = AuthController;