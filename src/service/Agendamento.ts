import AppError from "../Error";
import IConsultation from "../interfaces/IConsultation";
import AgendamentoRespositories from "../repositories/Agendamento";

export default class AgendamenoService{
    static async getAllByDoctor(doctorId: string): Promise<IConsultation[]>{
        const consultations = await AgendamentoRespositories.getAllByDoctor(doctorId);
        if(!consultations)
            throw new AppError('Nenhuma consulta disponível', 404);
        
        return consultations;
    }

    static async getById(consultationId: string): Promise<IConsultation>{
        const consultation = await AgendamentoRespositories.getById(consultationId);
        if(!consultation)
            throw new AppError('Consulta não encontrada', 404);

        return consultation;
    }

    static async getByIdAndUpdate(consultationUpdate: IConsultation): Promise<IConsultation>{
        const consultation = await AgendamentoRespositories.update(consultationUpdate);
        if(!consultation)
            throw new AppError('Erro ao atualizar', 400);
        return consultation;
    }

    static async createConsultation(payload: IConsultation){
        return await AgendamentoRespositories.createConsultation(payload);
    }
}