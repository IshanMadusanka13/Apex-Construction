import express from 'express';
import FeedbackController from '../controller/FeedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.get('/get', FeedbackController.getAllFeedbacks);
feedbackRouter.get('/getnew', FeedbackController.getNewFeedbacks);
feedbackRouter.post('/create', FeedbackController.addFeedback);
feedbackRouter.put('/reply', FeedbackController.replyToFeedback);

export default feedbackRouter;