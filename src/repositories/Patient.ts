import IPacient from "../interfaces/IPacient";
import { Patient } from "../models/Patient";

export default class PatientRepositories{
    static async getByCpf(cpf: string){
        return await Patient.findOne({ cpf });
    }

    static async create(payload: IPacient){
        return await Patient.create(payload);
    }
}