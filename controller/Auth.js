const CryptoJS = require("crypto-js");
const { User } = require("../models/User");
require('dotenv').config();
const jwt = require('jsonwebtoken');

class AuthController{
    static async login(req, res){
        const { objCrypto } = req.body;
        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { login, password } = obj;

        const user = await User.findOne({ cpf: login });
        if(!user) return res.status(404).send({ message: "CPF or password invalid" })
        
        bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
        const passDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        if(password != passDecrypt) return res.status(404).send({ message: "CPF or password invalid" });

        const token = jwt.sign({
            id: user.id,
            adm: user.adm,
            first_access: user.first_access
        },process.env.SECRET, {
            expiresIn: '1day'
        })

        return res.status(200).send({ token })
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

    static async resetPassword(req, res){
        const { objCrypto } = req.body;
        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { cpf, password, confirmPassword } = obj;
        console.log(obj);

        if(password != confirmPassword) return res.status(400).send({ message: "As senhas não correspondem" });
        if(!password) return res.status(400).send({ message: "password is required" });
        if(!cpf) return res.status(400).send({ message: "CPF is required" });
        if(password.length < 6) return res.status(400).send({ message: 'password is sort than 6 characters' })
        try {
            const user = await User.findOne({ cpf });
            if(!user) return res.status(404).send({ message: "User not found" });
            const passCrypto = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
            user.password = passCrypto;
            await user.save();
            return res.status(201).send({ message: 'Senha alterada com sucesso' });
        } catch (error) {
            console.log(error);
            return res.status(500).send({ message: error.message });
        }
    }

    static async createVacation(req, res){
        const { id } = req.params;
        const { vacation } = req.body;
        if(!vacation) return res.status(400).send({ message: "Vacation is required" });
        try {
            const user = await User.findById(id);
            user.vacation = vacation;
            await user.save();
            return res.status(201).send({ message: "Férias salvas com sucesso" });
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    }
}

module.exports = AuthController;