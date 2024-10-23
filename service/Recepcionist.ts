import AppError from "../Error";
import RecepcionistRepositories from "../repositories/Recepcionist";

export default class RecepcionistService{
    static async getById(recepcionistId: string){
        const recepcionist = await RecepcionistRepositories.getById(recepcionistId);
        if(!recepcionist)
            throw new AppError('Nenhuma recepcionista encontrada', 404);

        return recepcionist;
    }
}