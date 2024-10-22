import { NextFunction, Request, Response } from "express";
import AppError from "../Error";

export default class ConsultationMiddleware{
    static validateBody(req: Request, res: Response, next: NextFunction){
        const {
            date,
            hour,
            cpf,
            name,
            lastname
        } = req.body;

        if (!name) 
            throw new AppError("O nome é obrigatório", 400);
        if (!lastname) 
            throw new AppError("O sobrenome é obrigatório", 400);
        if (!cpf) 
            throw new AppError("O CPF é obrigatório", 400);
        if (!date) 
            throw new AppError("A data é obrigatória", 400);
        if (!hour) 
            throw new AppError("A hora é obrigatória", 400);
        
        next();
    }
}