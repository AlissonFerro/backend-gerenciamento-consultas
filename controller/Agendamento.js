const { Patient } = require('../models/Patient');
const Consultation = require('../models/Consultation');
const { User } = require('../models/User');
const { Recepcionist } = require('../models/Recepcionist');

class AgendamentoController {
    static async getAllByDoctor(req, res) {
        const { id } = req.params;
        try {
            const consultations = await Consultation.find({ 'doctor._id': id });
            return res.status(200).send(consultations);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async getSessionTime(req, res) {
        const { id } = req.params;
        try {
            const doctor = await User.findOne({ _id: id }, { session_time: true, start_time: true, finish_time: true });
            console.log(doctor);
            return res.status(200).send(doctor);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async confirmPresence(req, res) {
        const { id } = req.params;
        try {
            const consultation = await Consultation.findById(id);
            if (!consultation) return res.status(404).send({ message: "No consultation found" });

            const doctor = await User.findById(consultation.doctor._id);
            if (!doctor) return res.status(404).send({ message: 'No doctor found' });

            const consult = doctor.consultations.filter(consultation => consultation._id == id);
            if (!consult) return res.status(404).send({ message: "No consultation found for this doctor" });
            
            consult[0].confirmed_presence = true;
            consultation.confirmed_presence = true;

            await consultation.save();
            await User.findByIdAndUpdate(doctor.id, doctor);

            return res.status(200).send(doctor)
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async getConsultationByDayForDoctor(req, res){
        const {id, date} = req.params;
        try {
            const doctor = await User.findById(id, {consultations: true});
            const consultations = doctor.consultations.filter(consultation => consultation.date == date);
            consultations.sort((a, b) => {
                return a.hour - b.hour;
            });
            return res.status(200).send(consultations);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        } 
    }

    static async getConsultationByDay(req, res) {
        const { id, date } = req.params;

        try {
            
            const recepcionist = await Recepcionist.findById(id);
            console.log(recepcionist);

            const doctor = await User.findByOne({ _id: recepcionist.doctorId}, {consultations: true});
            
            if(!doctor) return res.status(404).send({ message: 'No doctor found' });

            const consultations = doctor.consultations.filter(consultation => consultation.date == date);
            consultations.sort((a, b) => {
                return a.hour - b.hour;
            });
            return res.status(200).send(consultations)
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }

    static async createConsultation(req, res) {
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

        if (!name) return res.status(400).send({ message: "O nome é obrigatório" });
        if (!lastname) return res.status(400).send({ message: "O sobrenome é obrigatório" });
        if (!cpf) return res.status(400).send({ message: "O CPF é obrigatório" });
        if (!date) return res.status(400).send({ message: "A data é obrigatória" });
        if (!hour) return res.status(400).send({ message: "A hora é obrigatória" });


        try {
            const doctor = await User.findOne({ _id: user_id }, { name: true, lastname: true, cpf: true, consultations: true, not_avaliable_consultation: true });

            if (!doctor) return res.status(404).send({ message: "Usuário não encontrado" });

            const consultationsByDate = doctor.consultations.filter(consultation => consultation.date == date);
            let avaliable = true;

            consultationsByDate.map((consultation) => {
                if (consultation.hour == hour) avaliable = false;
            });

            if (!avaliable)
                return res.status(400).send({ message: "Horário indisponível" })

            let patient = await Patient.findOne({ cpf });
            if (!patient) {
                const newPatient = {
                    name,
                    lastname,
                    cpf,
                    first_consultation: true,
                    agreement,
                    agreement_number,
                    phone,
                    celphone
                }
                patient = await Patient.create(newPatient);
            }

            let consultation = {
                date, hour, patient, doctor, confirmed_presence: false
            }
            const teste = await Consultation.create(consultation);

            consultation = {
                _id: teste._id,
                date,
                hour,
                patient,
                confirmed_presence: false
            }

            doctor.consultations.push(consultation);

            await doctor.save();

            return res.status(201).send({ message: "Consulta criada com sucesso" })

        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    };

    static async getConsultations(req, res) {
        const { id } = req.params;
        try {
            const doctor = await User.findById(id, {consultations: true}).sort({'consultations.date': -1});
            if (!doctor) return res.status(404).send({ message: 'Doctor not found' });
            const consultations = doctor.consultations;
            
            return res.status(200).send(consultations)
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    }
}

module.exports = AgendamentoController;