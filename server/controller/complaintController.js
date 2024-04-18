import Complaint from '../models/complaintModel.js';
import logger from "../utils/logger.js";

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
        name: req.body.cname,
        email: req.body.email,
        phone: req.body.phone,
        type: req.body.type,
        subject: req.body.subject,
        complaint: req.body.complaint,
    });
    complaint.save()
    .then(response => {
        logger.info(response);
        res.json({ response })
    })
    .catch(error =>{
        logger.error(error);
        res.json({ error})
    });
};

const updateComplaint = (req, res, next) => {
    const { name,email,phone,type,subject,complaint } = req.body;
    logger.info(req.body);
    Complaint.updateOne({ name: name}, { $set: {email: email,phone: phone,type: type,subject: subject, complaint: complaint}})
    .then(response => {
        logger.info(response);
        res.json({ response })
    })
    .catch(error =>{
        logger.error(error);
        res.json({ error})
    });
}

const deleteComplaint = (req, res, next) => {
    logger.info(req.params.id);
    Complaint.deleteOne({_id: req.params.id})
    .then(response => {
        logger.info(response);
        res.json({ response })
    })
    .catch(error =>{
        logger.error(error);
        res.json({ error})
    });
     
}

const getTotalComplaintCount = (req, res, next) => {
    Complaint.countDocuments()
        .then(count => {
            res.json({ count });
        })
        .catch(error => {
            res.json({ error });
        });
};

export default { getComplaint, addComplaint, updateComplaint, deleteComplaint, getTotalComplaintCount };