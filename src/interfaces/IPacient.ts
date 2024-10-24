import { Types } from "mongoose"

export default interface IPacient{
    _id?: Types.ObjectId,
    name: string,
    lastname: string,
    first_consultation: boolean,
    agreement: string,
    agreement_number: string,
    phone: string,
    celphone: string,
    cpf: string
}