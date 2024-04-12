import express from 'express';
import feedbackController from '../controller/FeedbackController.js';

const feedbackRouter = express.Router();

feedbackRouter.get('/get', feedbackController.getFeedback);
feedbackRouter.post('/create', feedbackController.addFeedback);
feedbackRouter.put('/update', feedbackController.updateFeedback);
feedbackRouter.delete('/delete/:id', feedbackController.deleteFeedback);

export default feedbackRouter;