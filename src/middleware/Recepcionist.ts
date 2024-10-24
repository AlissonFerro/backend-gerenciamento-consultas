import { NextFunction, Request, Response } from "express";
import AppError from "../Error";

export default class RecepcionistMiddleware{
    static validateBody(req: Request, _: Response, next: NextFunction){
        const { objCrypto } = req.body;
        if(!process.env.SECRET)
            throw new AppError('Dotenv Error', 403);

        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { name, lastname, cpf, password } = obj;

        if(!name) 
            throw new AppError("Nome é obrigatório",400);
        if(name.length<3)             
            throw new AppError("Nome deve ser maior que 3 caracteres",400);

        if(!lastname)
            throw new AppError("Sobrenome é obrigatório",400);
        if(lastname.length<3) 
            throw new AppError("Sobrenome deve ser maior que 3 caracteres",400);

        if(!cpf)
            throw new AppError("CPF é obrigatório", 400);
        if(cpf.length!=14) 
            throw new AppError("CPF deve ter 11 caracteres", 400);

        if(!password)
            throw new AppError("Senha é obrigatório", 400);
        if(password.length<6) 
            throw new AppError("Senha deve ter mais que 6 caracteres",400);

        next();
    }
}