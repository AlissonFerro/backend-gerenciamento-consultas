import { Date, Types } from "mongoose";
import IPacient from "./IPacient";
import IDoctor from "./IDoctor";

export default interface IConsultation{
    _id?: Types.ObjectId,
    date: Date,
    hour: string,
    confirmed_presence: boolean,
    patient: IPacient,
    doctor: IDoctor
};