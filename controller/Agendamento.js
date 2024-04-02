const { Patient } = require('../models/Patient');
const Consultation = require('../models/Consultation');
const { User } = require('../models/User');

class AgendamentoController{
    static async getAllByDoctor(req, res){ 
        const {id} = req.params;
        try{
            const consultations = await Consultation.find({ 'doctor._id': id });
            return res.status(200).send(consultations);
        }catch(error){
            return res.status(500).send({ message: error.message });
        }
    }

    static async createConsultation(req, res){
        const { user_id } = req.params;

        const { 
            time, 
            hour, 
            cpf, 
            name, 
            lastname, 
            agreement, 
            agreement_number, 
            phone, 
            celphone 
        } = req.body;

        try {
            const doctor = await User.findOne({ _id: user_id }, {name: true, lastname: true, cpf: true});
            
            if(!doctor) return res.status(404).send({ message: "Usuário não encontrado" });
            
            let patient = await Patient.findOne({ cpf });
            if(!patient){
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

            const consultation = {
                time,
                hour,
                patient,
                doctor
            }

            await Consultation.create(consultation);
            return res.status(201).send({ message: "Consulta criada com sucesso" })
            
        } catch (error) {
            return res.status(500).send({ message: error.message })
        }
    }
}

module.exports = AgendamentoController;