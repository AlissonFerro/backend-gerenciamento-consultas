const { Recepcionist } = require('../models/Recepcionist');
const CryptoJS = require("crypto-js");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

class RecepcionistController{
    static async login(req, res){
        const { objCrypto } = req.body;
        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { login, password } = obj;
        try {
        
            const recepcionist = await Recepcionist.findOne({ cpf: login });
            if(!recepcionist) return res.status(404).send({ message: "CPF or password invalid" })
            
            bytes = CryptoJS.AES.decrypt(recepcionist.password, process.env.SECRET);
            const passDecrypt = bytes.toString(CryptoJS.enc.Utf8);
            if(password != passDecrypt) return res.status(404).send({ message: "CPF or password invalid" });

            const token = jwt.sign({
                id: recepcionist.id,
                first_access: recepcionist.first_access,
                admAccont: recepcionist.admAccont
            },process.env.SECRET, {
                expiresIn: '1day'
            })

            return res.status(200).send({ token, id: recepcionist._id })
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    }

    static async create(req, res){
        const { id } = req.params;
        const { objCrypto } = req.body;

        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { name, lastname, cpf, password } = obj;

        if(!name) return res.status(400).send({ message: "Nome é obrigatório"});
        if(name.length<3) return res.status(400).send({ message: "Nome deve ter mais que 3 caracteres"});

        if(!lastname) return res.status(400).send({ message: "Sobrenome é obrigatório"});
        if(lastname.length<3) return res.status(400).send({ message: "Sobrenome deve ter mais que 3 caracteres"});

        if(!cpf) return res.status(400).send({ message: "CPF é obrigatório"});
        if(cpf.length!=14) return res.status(400).send({ message: "CPF deve ter 11 caracteres"});

        if(!password) return res.status(400).send({ message: "Senha é obrigatório"});
        if(password.length<6) return res.status(400).send({ message: "Senha deve ter mais que 6 caracteres"});

        try {
            const doctor = await User.findById(id, {recepcionists: true});
            if(!doctor) return res.status(404).send({ message: 'No doctor found' });

            const passCrypto = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();

            const recepcionist = {
                name, 
                lastname, 
                password: passCrypto, 
                cpf, 
                first_access: true,
                admAccont: false,
                doctorId: doctor._id
            }
            
            const recepcionistCreated = await Recepcionist.create(recepcionist);
            doctor.recepcionists.push(recepcionistCreated);

            await doctor.save();
            return res.status(201).send({ message: "Recepcionista cadastrado com sucesso" })
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    }

    static async getRecepcionists(req, res){
        const { id } = req.params;
        try {
            const doctor = await User.findById(id, {recepcionists: true});
            return res.status(200).send(doctor)
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    };

    static async delete(req, res){
        const {id} = req.params;
        try {
            
        } catch (error) {
            
        }
    }
};

module.exports = RecepcionistController;