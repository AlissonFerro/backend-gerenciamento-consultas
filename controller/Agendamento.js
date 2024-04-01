const { Patient } = require('../models/Patient');
const Consultation = require('../models/Consultation');

class AgendamentoController{
    static async getAllByDoctor(req, res){ 
        console.log(req.params);
        try{
            const patient = await Patient.find();
            console.log(patient);
            return res.status(200).send(patient);
        }catch(error){
            return res.status(500).send({ message: error.message });
        }
    }

    static async createConsultation(req, res){
        console.log(req.body);
        const { 
            time, 
            hour, 
            patient_id, 
            name, 
            lastname, 
            agreement, 
            agreement_number, 
            phone, 
            celphone 
        } = req.body;

        try {
            let patient = await Patient.findById(patient_id);
            if(!patient){
               const newPatient = {
                name,
                lastname,
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
                patient
            }

            await Consultation.create(consultation);
            return res.status(201).send({ message: "Consulta criada com sucesso" })
            
        } catch (error) {
            
        }
    }
}

module.exports = AgendamentoController;