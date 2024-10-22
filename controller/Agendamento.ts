import { Request, Response } from "express";
import DoctorService from "../service/Doctor";
import IConsultation from "../interfaces/IConsultation";
import AgendamenoService from "../service/Agendamento";
import AppError from "../Error";
import { Types } from "mongoose";
import RecepcionistService from "../service/Recepcionist";
import PatientService from "../service/Patient";
import IPacient from "../interfaces/IPacient";

class AgendamentoController {
    static async getAllByDoctor(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const consultations = await AgendamenoService.getAllByDoctor(id);
        res.status(200).send(consultations);
    }

    static async getSessionTime(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        const doctor = await DoctorService.getSessionTime(id);

        res.status(200).send(doctor);
    }

    static async confirmPresence(req: Request, res: Response): Promise<void>{
        const { id } = req.params;

        const consultation = await AgendamenoService.getById(id);
        const doctor = await DoctorService.getById(String(consultation.doctor._id));

        const consult = doctor.consultations
            .filter((consultation) => consultation._id == new Types.ObjectId(id));
        
        if (!consult) 
            throw new AppError("No consultation found for this doctor", 404);
        
        consult[0].confirmed_presence = true;
        consultation.confirmed_presence = true;

        await AgendamenoService.getByIdAndUpdate(consultation);
        await DoctorService.getByIdAndUpdate(doctor);

        res.status(200).send(doctor)
    }

    static async getConsultationByDayForDoctor(req: Request, res: Response): Promise<void>{
        const {id, date} = req.params;
        
        const doctor = await DoctorService.getById(id);

        const consultations = doctor.consultations.filter((consultation) => String(consultation.date) == date);
        
        consultations.sort((a, b) => {
            return Number(a.hour) - Number(b.hour);
        });
        
        res.status(200).send(consultations);
    }

    static async getConsultationByDay(req: Request, res: Response): Promise<void>{
        const { id, date } = req.params;

        const recepcionist = await RecepcionistService.getById(id);

        if(!recepcionist.doctorId)
            throw new AppError('Nenhum doctor associado a recepcionista', 422);

        const consultations = await DoctorService.getConsultations(recepcionist.doctorId);
        
        const consultationsSorted = consultations.filter((consultation) => String(consultation.date) == date);
        consultations.sort((a, b) => {
            return Number(a.hour) - Number(b.hour);
        });
        res.status(200).send(consultationsSorted);    
    }

    static async createConsultation(req: Request, res: Response) {
        const { user_id } = req.params;
        const {
            date,
            hour,
            cpf,
            name,
            lastname,
            agreement,
            agreement_number,
            phone,
            celphone
        } = req.body;

        const doctor = await DoctorService.getById(user_id);

        const consultationsByDate = doctor.consultations.filter((consultation: { date: any; }) => consultation.date == date);
        let avaliable = true;

        consultationsByDate.map((consultation: { hour: any; }) => {
            if (consultation.hour == hour) 
                avaliable = false;
        });

        if (!avaliable)
            throw new AppError("Horário indisponível", 422);

        let patient: IPacient = await PatientService.getByCpf(cpf);

        if (!patient) {
            const newPatient: IPacient = {
                name,
                lastname,
                cpf,
                first_consultation: true,
                agreement,
                agreement_number,
                phone,
                celphone
            }

            patient = await PatientService.create(newPatient);
        }

        let consultation: IConsultation = {
            date, hour, patient, doctor, confirmed_presence: false
        }

        const consultationCreated = await AgendamenoService.createConsultation(consultation);

        consultation = {
            _id: consultationCreated._id,
            date,
            hour,
            patient,
            doctor,
            confirmed_presence: false
        }

        doctor.consultations.push(consultation);
        await DoctorService.getByIdAndUpdate(doctor);
        
        return res.status(201).send({ message: "Consulta criada com sucesso" })
    }

    static async getConsultations(req: Request, res: Response) {
        const { id } = req.params;
        const consultations = await DoctorService.getConsultations(id)
        return res.status(200).send(consultations);
    }
}

module.exports = AgendamentoController;