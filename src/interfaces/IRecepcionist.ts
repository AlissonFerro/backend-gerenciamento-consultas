import { Types } from "mongoose";

export default interface IRecepcionist{
    _id?: Types.ObjectId,
    name: string,
    lastname: string,
    password?: string,
    cpf: string,
    first_access: boolean,
    doctorId: Types.ObjectId,
    admAccont: boolean
};