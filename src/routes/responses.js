// routes/responses.js
import express from 'express';
import { createResponse, getResponses, updateResponse, deleteResponse } from '../controllers/responseController.js';

const router = express.Router();

router.post('/', createResponse);
router.get('/', getResponses);
router.put('/:id', updateResponse);
router.delete('/:id', deleteResponse);

export default router;
