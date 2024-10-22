import IConsultation from "../interfaces/IConsultation";
import { Consultation } from "../models/Consultation";

export default class AgendamentoRespositories{
    static async getAllByDoctor(doctorId: string): Promise<IConsultation[] | null>{
        return await Consultation.find({ 'doctor._id': doctorId })
    }

    static async getById(consultationId: string): Promise<IConsultation | null>{
        return await Consultation.findById(consultationId);
    }

    static async update(consultation: IConsultation): Promise<IConsultation>{
        return await Consultation.findByIdAndUpdate(consultation._id, consultation) as IConsultation;
    }

    static async createConsultation(consultation: IConsultation): Promise<IConsultation>{
        return await Consultation.create(consultation) as unknown as IConsultation;
    }
}