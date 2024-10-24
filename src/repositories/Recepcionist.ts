import IRecepcionist from "../interfaces/IRecepcionist";
import { Recepcionist } from "../models/Recepcionist";

export default class RecepcionistRepositories{
    static async getById(recepcionistId: string){
        return await Recepcionist.findById(recepcionistId);
    }

    static async getByCpf(cpf: string): Promise<IRecepcionist>{
        return await Recepcionist.findOne({ cpf }) as IRecepcionist;
    }

    static async createRecepcionist(payload: IRecepcionist): Promise<IRecepcionist>{
        return await Recepcionist.create(payload) as unknown as IRecepcionist;
    }
}