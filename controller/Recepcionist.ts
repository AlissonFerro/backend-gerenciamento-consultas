import { Request, Response } from "express";
import AppError from "../Error";
import DoctorService from "../service/Doctor";

const { Recepcionist } = require('../models/Recepcionist');
const CryptoJS = require("crypto-js");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/User');

export default class RecepcionistController{
    static async login(req: Request, res: Response): Promise<void>{
        const { objCrypto } = req.body;
        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { login, password } = obj;

        const recepcionist = await Recepcionist.findOne({ cpf: login });
        if(!recepcionist) 
            throw new AppError("CPF or password invalid", 404);
        
        bytes = CryptoJS.AES.decrypt(recepcionist.password, process.env.SECRET);
        const passDecrypt = bytes.toString(CryptoJS.enc.Utf8);

        if(password != passDecrypt)
            throw new AppError("CPF or password invalid", 404);

        const token = jwt.sign({
            id: recepcionist.id,
            first_access: recepcionist.first_access,
            admAccont: recepcionist.admAccont
        },process.env.SECRET, {
            expiresIn: '1day'
        })

        res.status(200).send({ token, id: recepcionist._id });
    }

    static async create(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const { objCrypto } = req.body;

        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { name, lastname, cpf, password } = obj;
        
        const doctor = await DoctorService.getById(id);

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

        await DoctorService.getByIdAndUpdate(doctor);

        res.status(201).send({ message: "Recepcionista cadastrado com sucesso" });
    }

    static async getRecepcionists(req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        const doctor = await User.findById(id, {recepcionists: true});
        res.status(200).send(doctor);
    };

    static async delete(req: Request, res: Response): Promise<void>{
        const {id} = req.params;
        try {
            
        } catch (error) {
            
        }
    }
};