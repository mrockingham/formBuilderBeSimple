// routes/questions.js
import express from 'express';
import { createQuestion, getQuestions, updateQuestion, deleteQuestion } from '../controllers/questionController.js';

const router = express.Router();

router.post('/', createQuestion);
router.get('/', getQuestions);
router.put('/:id', updateQuestion);
router.delete('/:id', deleteQuestion);

export default router;
