import AppError from "../Error";
import IDoctor from "../interfaces/IDoctor";
import DoctorRepositories from "../repositories/Doctor";

export default class DoctorService{
    static async getSessionTime(doctorId: string) {
        const session_time = await DoctorRepositories.getSessionTime(doctorId);

        if(!session_time)
            throw new AppError('Nenhum horario para sessão encontrado', 404);
        
        return session_time;
    }

    static async getById(doctorId: string){
        const doctor = await DoctorRepositories.getById(doctorId);
        if(!doctor)
            throw new AppError('Nenhum médico encontrado', 404);

        return doctor;
    }

    static async getByIdAndUpdate(doctorUpdate: IDoctor){
        const doctor = await DoctorRepositories.getByIdAndUpdate(doctorUpdate);
        if(!doctor)
            throw new AppError('Erro ao atualizar', 400);
        return doctor;
    }

    static async getConsultations(doctorId: string){
        const doctor = await DoctorRepositories.getByIdAndSort(doctorId);
        
        if(!doctor)
            throw new AppError('Doctor not found', 404);
        
        return doctor.consultations;
    }
}