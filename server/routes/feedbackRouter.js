import express from 'express';
import feedbackController from '../controller/feedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.get('/feedbacks', feedbackController.getFeedback);
feedbackRouter.post('/createfeedback', feedbackController.addFeedback);
feedbackRouter.post('/updatefeedback', feedbackController.updateFeedback);
feedbackRouter.post('/deletefeedback', feedbackController.deleteFeedback);

export default feedbackRouter;