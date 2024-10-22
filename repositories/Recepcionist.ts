import { Recepcionist } from "../models/Recepcionist";

export default class RecepcionistRepositories{
    static async getById(recepcionistId: string){
        return await Recepcionist.findById(recepcionistId);
    }
}