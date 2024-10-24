import IDoctor from "../interfaces/IDoctor";
import IRecepcionist from "../interfaces/IRecepcionist";
import { User } from "../models/User";

export default class DoctorRepositories{
    static async getDoctors(): Promise<IDoctor[]> {
        return await User.find({}, {password: false, vacation: false, consultations: false}).sort({name: 1}) as unknown as IDoctor[];
    }
    static async getSessionTime(doctorId: string) {
        return await User.findOne({ _id: doctorId }, { session_time: true, start_time: true, finish_time: true });
    }
    static async getById(doctorId: string): Promise<IDoctor>{
        return await User.findOne({ _id: doctorId }, { password: false }) as IDoctor;
    }
    
    static async getByIdAndUpdate(doctorUpdate: IDoctor){
        return await User.findByIdAndUpdate(doctorUpdate._id, doctorUpdate);
    }

    static async getByIdAndSort(doctorId: string): Promise<IDoctor | null>{
        return await User.findOne({ _id: doctorId }, {consultations: true}).sort({'consultations.date': -1}) as unknown as IDoctor;
    }

    static async getByCpf(cpf: string): Promise<IDoctor | null>{
        return await User.findOne({ cpf });
    }

    static async getRecepcionistById(doctorId: string): Promise<IRecepcionist[]>{
        return await User.findOne({ _id: doctorId }, {recepcionists: true}) as IRecepcionist[];
    }

    static async getByIdLessPassword(doctorId: string): Promise<IDoctor | null>{
        return await User.findOne({ _id: doctorId }, { password: false });
    }

    static async createUser(payload: IDoctor): Promise<IDoctor>{
        return await User.create(payload) as unknown as IDoctor;
    }

    static async modifyDoctor(payload: IDoctor): Promise<IDoctor>{
        return await User.findByIdAndUpdate(payload._id, payload) as IDoctor;
    }
}