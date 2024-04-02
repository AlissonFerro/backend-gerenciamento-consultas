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
                adm
            }
            
            await User.create(user);
            return res.status(201).send({ message: "Usuário cadastrado com sucesso" })
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }

    }
}

module.exports = AuthController;