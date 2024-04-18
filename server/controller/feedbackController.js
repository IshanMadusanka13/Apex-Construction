import Feedback from "../models/feedbackModel.js";
import logger from "../utils/logger.js";

const getFeedbackById = (req, res, next) => {
    const id = req.params.id;
    Feedback.findOne({ id: id })
        .then(response => {
            if(response) {
                res.json({ response });
            } else {
                res.json({ error: "No data found" });
            }
        })
        .catch(error => {
            res.json({ error });
        });
};

const getFeedback = (req, res, next) => {
    Feedback.find()
     .then(response => {
        res.json({ response })
     })
      .catch(error => {
        res.json({  error})
      });
};

const addFeedback = (req,res,next) =>{
    const feedback = new Feedback ({
        id: req.body.id,
        feedback: req.body.feedback,
    });
    feedback.save()
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
};

const updateFeedback = (req, res, next) => {
    const { id,feedback } = req.body;
    Feedback.updateOne({ id: id}, { $set: {feedback: feedback}})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
}

const deleteFeedback = (req, res, next) => {
    const id = req.params.id;
    Feedback.deleteOne({id: id})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
     
}

const getTotalFeedbackCount = (req, res, next) => {
    Feedback.countDocuments()
        .then(count => {
            res.json({ count });
        })
        .catch(error => {
            res.json({ error });
        });
};






export default { getFeedback, addFeedback, updateFeedback, deleteFeedback, getFeedbackById, getTotalFeedbackCount };