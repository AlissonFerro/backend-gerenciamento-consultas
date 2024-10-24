import { Request, Response } from "express";
import AppError from "../Error";
import DoctorService from "../service/Doctor";
import RecepcionistService from "../service/Recepcionist";
import * as jwt from 'jsonwebtoken';
import CryptoJS from "crypto-js";
import dotenv from 'dotenv';
import IRecepcionist from "../interfaces/IRecepcionist";
dotenv.config();

export default class RecepcionistController{
    static async login(req: Request, res: Response): Promise<void>{
        const { objCrypto } = req.body;
        if(!process.env.SECRET)
            throw new AppError('Dotenv Error', 403);

        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { login, password } = obj;

        const recepcionist = await RecepcionistService.getByCpf(login);
        if(!recepcionist.password)
            throw new AppError('No password content', 500);

        bytes = CryptoJS.AES.decrypt(recepcionist.password, process.env.SECRET);
        const passDecrypt = bytes.toString(CryptoJS.enc.Utf8);

        if(password != passDecrypt)
            throw new AppError("CPF or password invalid", 404);

        const token = jwt.sign({
            id: recepcionist._id,
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
        if(!process.env.SECRET)
            throw new AppError('Dotenv Error', 403);

        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { name, lastname, cpf, password } = obj;
        
        const doctor = await DoctorService.getById(id);

        const passCrypto = CryptoJS.AES.encrypt(password, process.env.SECRET).toString();

        const recepcionist: IRecepcionist = {
            name, 
            lastname, 
            password: passCrypto, 
            cpf, 
            first_access: true,
            admAccont: false,
            doctorId: doctor._id!
        }
        
        const recepcionistCreated = await RecepcionistService.createRecepcionist(recepcionist);
        doctor.recepcionists.push(recepcionistCreated);

        await DoctorService.getByIdAndUpdate(doctor);

        res.status(201).send({ message: "Recepcionista cadastrado com sucesso" });
    }

    static async getRecepcionists(req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        const recepcionists = await DoctorService.getRecepcionistById(id);
        res.status(200).send(recepcionists);
    };

    static async delete(req: Request, res: Response): Promise<void>{
        const {id} = req.params;

    }
};