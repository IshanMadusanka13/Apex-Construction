import Complaint from '../models/complaintModel.js';

const getComplaint = (req, res, next) => {
    Complaint.find()
     .then(response => {
        res.json({ response })
     })
      .catch(error => {
        res.json({  error})
      });
};

const addComplaint = (req,res,next) =>{
    const complaint = new Complaint ({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
        subject: req.body.subject,
        complaint: req.body.complaint,
    });
    complaint.save()
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
};

const updateComplaint = (req, res, next) => {
    const { name,email,phone,type,subject,complaint } = req.body;
    Complaint.updateOne({ name: name}, { $set: {email: email,phone: phone,type: type,subject: subject, complaint: complaint}})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
}

const deleteComplaint = (req, res, next) => {
    const name = req.body.name;
    Complaint.deleteOne({name: name})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
     
}

export default { getComplaint, addComplaint, updateComplaint, deleteComplaint };