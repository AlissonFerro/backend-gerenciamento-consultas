import { NextFunction, Request, Response } from "express";
import AppError from "../Error";

export default class AuthMiddleware{
    static validateBody(req: Request, res: Response, next: NextFunction){
        const { objCrypto } = req.body;
        if(!process.env.SECRET)
            throw new AppError('dotenv error', 403);

        var bytes = CryptoJS.AES.decrypt(objCrypto, process.env.SECRET);
        const objDecrypt = bytes.toString(CryptoJS.enc.Utf8);
        const obj = JSON.parse(objDecrypt);
        const { cpf, password, confirmPassword } = obj;

        if(password != confirmPassword) 
            throw new AppError("As senhas não correspondem", 400);
        
        if(!password) 
            throw new AppError("password is required", 400);

        if(!cpf) 
            throw new AppError("CPF is required", 400);

        if(password.length < 6) 
            throw new AppError('password is sort than 6 characters', 400);
            
        next();
    }
}