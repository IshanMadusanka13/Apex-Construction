import Feedback from "../models/feedbackModel";


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
    const id = req.body.id;
    Feedback.deleteOne({id: id})
    .then(response => {
        res.json({ response })
    })
    .catch(error =>{
        res.json({ error})
    });
     
}


export default { getFeedback, addFeedback, updateFeedback, deleteFeedback };