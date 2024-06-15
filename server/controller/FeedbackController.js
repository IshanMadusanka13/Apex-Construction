import Feedback from "../models/Feedback.js";
import logger from "../utils/logger.js";

const FeedbackController = {

    replyToFeedback: async (req, res) => {

        Feedback
            .updateOne(
                { _id: req.body.id },
                {
                    $set: {
                        reply: req.body.reply,
                        status: true,
                    }
                }
            )
            .then(response => {
                logger.info("Succesfully Replied to Feedback");
                res.status(200).json({ response });
            })
            .catch(error => {
                logger.error("Error Replying Feedback");
                res.status(400).json({ message: error.message });
            });
    },

    getAllFeedbacks: async (req, res) => {
        Feedback.find()
            .then(response => {
                logger.info("Succesfully fetched all Feedback");
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error Fetching Feedbacks");
                res.status(400).json({ message: error.message });
            });
    },

    addFeedback: async (req, res) => {
        const feedback = new Feedback({
            name: req.body.name,
            email: req.body.email,
            type: req.body.type,
            message: req.body.message,
        });
        feedback.save()
            .then(response => {
                logger.info("Succesfully Added Feedback");
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error Adding Feedbacks");
                res.status(400).json({ message: error.message });
            });
    },

    getNewFeedbacks: async (req, res, next) => {
        Feedback.find({ status: false })
            .then(response => {
                logger.info("Succesfully fetched New Feedbacks");
                res.status(200).json(response);
            })
            .catch(error => {
                logger.error("Error Fetching New Feedbacks");
                res.status(400).json({ message: error.message });
            });
    },

};
export default FeedbackController;