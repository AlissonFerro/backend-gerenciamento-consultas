import IPacient from "../interfaces/IPacient";
import PatientRepositories from "../repositories/Patient";

export default class PatientService{
    static async getByCpf(cpf: string): Promise<IPacient>{
        return await PatientRepositories.getByCpf(cpf) as IPacient;
    }

    static async create(payload: IPacient): Promise<IPacient>{
        return await PatientRepositories.create(payload) as IPacient;
    }
}