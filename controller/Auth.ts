import { Request, Response } from "express";
import AppError from "../Error";
import DoctorService from "../service/Doctor";
import dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import IDoctor from "../interfaces/IDoctor";
dotenv.config();

const CryptoJS = require("crypto-js");
const { Recepcionist } = require("../models/Recepcionist");

export default class AuthController{
    static async login(req: Request, res: Response): Promise<void>{
        const { objCrypto } = req.body;
        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { login, password } = obj;

        if(!process.env.SECRET)
            throw new AppError('DotEnv Error', 403);

        const user = await DoctorService.getByCpf(login);
        const recepcionist = await Recepcionist.findOne({ cpf: login });
        if(!user && !recepcionist) 
            throw new AppError("CPF or password invalid", 404);
        if(user){
            bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const passDecrypt = bytes.toString(CryptoJS.enc.Utf8);
            if(password != passDecrypt) 
                throw new AppError("CPF or password invalid", 404);
                
            const token = jwt.sign({
                id: user._id,
                adm: user.adm,
                first_access: user.first_access,
                admAccont: user.admAccont
            },process.env.SECRET, {
                expiresIn: '1day'
            })

            res.status(200).send({ token, id: user._id, admAccont: user.admAccont })
        }
        else{
            bytes = CryptoJS.AES.decrypt(recepcionist.password, process.env.SECRET)
            const passDecrypt = bytes.toString(CryptoJS.enc.Utf8)
            if(password != passDecrypt) 
                throw new AppError("CPF or password invalid", 404);

            const token = jwt.sign({
                id: recepcionist.id,
                adm: false,
                first_access: recepcionist.first_access,
                admAccont: recepcionist.admAccont
            },process.env.SECRET, {
                expiresIn: '1day'
            })

            res.status(200).send({ token, id: recepcionist._id, admAccont: recepcionist.admAccont })
        }
    }

    static async register(req: Request, res: Response): Promise<void>{
        const { objCrypto } = req.body;

        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { name, lastname, cpf, CRM, password } = obj;

        const passCrypto = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
        let adm = false;
        
        if(cpf === '062.027.409-30') adm=true;

        const user: IDoctor = {
            name: String(name), 
            lastname: String(lastname), 
            password: String(passCrypto), 
            cpf: String(cpf), 
            CRM: String(CRM),
            first_access: true,
            adm,
            admAccont: true,
            start_time: 0,
            finish_time: 24,
            session_time: 0,
            consultations: [],
            not_avaliable_consultation: [],
            recepcionists: [],
            vacation: []
        }
        
        await DoctorService.createUser(user);
        res.status(201).send({ message: "Usuário cadastrado com sucesso" })
    }

    static async modify(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const { password, start_time, finish_time, session_time } = req.body;

        const user = await DoctorService.getById(id);
        ;
        if(password) {
            const passCrypto = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();
            user.password = passCrypto;
        }
        if(start_time) {
            user.start_time = start_time;
            user.finish_time = finish_time;
            user.session_time = session_time;
        }

        await DoctorService.modifyDoctor(user);       
        res.status(200).send({message: "Usuário modificado com sucesso"})
    }

    static async resetPassword(req: Request, res: Response): Promise<void>{
        const { objCrypto } = req.body;
        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { cpf, password } = obj;
        
        const user = await DoctorService.getByCpf(cpf);        
        if(!user) throw new AppError('CPF or password invalid', 404);

        const passCrypto = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();

        const userUpdated = user;
        userUpdated.password = passCrypto;

        await DoctorService.getByIdAndUpdate(userUpdated);
        
        res.status(201).send({ message: 'Senha alterada com sucesso' });    
    }

    static async createVacation(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const { vacation } = req.body;

        if(!vacation) 
            throw new AppError("Vacation is required", 400);

        const user = await DoctorService.getById(id); 
        const userUpdated = user;
        userUpdated.vacation = vacation;

        await DoctorService.getByIdAndUpdate(userUpdated);
        res.status(201).send({ message: "Férias salvas com sucesso" });
    }

    static async getVacation(req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        const user = await DoctorService.getByIdLessPassword(id);
        res.status(200).send(user);
    }

    static async getDoctors(_: Request, res: Response): Promise<void>{
        const doctors = await DoctorService.getDoctors();
        res.status(200).send(doctors);        
    }
}