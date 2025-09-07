import {
  createFAQ,
  getAllFAQs,
  getFAQById,
  updateFAQ,
  deleteFAQ,
  voteFAQ,
  trackView,
} from '../controllers/FaqsController.js';
import express from 'express';

const router = express.Router();

router.get('/faqs/trackView/:id', trackView);
router.post('/faqs', createFAQ);
router.get('/faqs', getAllFAQs);
router.get('/faqs/:id', getFAQById);
router.put('/faqs/:id', updateFAQ);
router.delete('/faqs/:id', deleteFAQ);
router.delete('/faqs/:id/', deleteFAQ);
router.patch('/faqs/:faqId/upvote', (req, res) => voteFAQ(req, res, true));
router.patch('/faqs/:faqId/downvote', (req, res) => voteFAQ(req, res, false));

export default router;
