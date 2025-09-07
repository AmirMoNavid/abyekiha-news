import { Router } from 'express';
import { createPoll, getPolls, getPollById, createResponse, getResponsesByPoll, getResponses } from '../controllers/PollController.js';

const router = Router();

router.get('/poll/responses/:pollId', getResponsesByPoll);
router.get('/poll/responses', getResponses);
router.post('/poll/responses', createResponse);
router.get('/poll/questions', getPolls);
router.get('/poll/questions/:id', getPollById);
router.post('/poll/questions', createPoll);

export default router;
