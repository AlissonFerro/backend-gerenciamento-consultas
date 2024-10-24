import AppError from "../Error";
import IRecepcionist from "../interfaces/IRecepcionist";
import RecepcionistRepositories from "../repositories/Recepcionist";

export default class RecepcionistService{
    static async getById(recepcionistId: string){
        const recepcionist = await RecepcionistRepositories.getById(recepcionistId);
        if(!recepcionist)
            throw new AppError('Nenhuma recepcionista encontrada', 404);

        return recepcionist;
    }

    static async getByCpf(cpf: string){ 
        return await RecepcionistRepositories.getByCpf(cpf);
    }

    static async createRecepcionist(payload: IRecepcionist){
        const recepcionist = await RecepcionistRepositories.createRecepcionist(payload);
        if(!recepcionist)
            throw new AppError("Erro ao salvar", 500);

        return recepcionist;
    }
}