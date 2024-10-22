import IDoctor from "../interfaces/IDoctor";
import { User } from "../models/User";

export default class DoctorRepositories{
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
        return await User.findOne({ _id: doctorId }, {consultations: true}).sort({'consultations.date': -1}) as IDoctor;
    }
}