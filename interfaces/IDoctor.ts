import { Date, Types } from "mongoose";
import IConsultation from "./IConsultation";

export default interface IDoctor{
    _id: Types.ObjectId,
    name: string,
    lastname: string,
    password?: string,
    cpf: string,
    CRM?: string,
    first_access: boolean,
    adm: boolean,
    admAccont: boolean,
    start_time: number,
    finish_time: number,
    session_time: number,
    consultations: IConsultation[],
    vacation: Date[],
    not_avaliable_consultation: Date[],
    recepcionists: IDoctor[]
}