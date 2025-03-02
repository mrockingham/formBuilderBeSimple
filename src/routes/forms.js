// src/routes/forms.js
import express from 'express';
import {
  createForm,
  getForms,
  updateForm,
  deleteForm
} from '../controllers/formController.js';

const router = express.Router();

// Route to create a new form
router.post('/', createForm);

// Route to retrieve all forms
router.get('/', getForms);

// Route to update a form
router.put('/:id', updateForm);

// Route to delete a form
router.delete('/:id', deleteForm);

export default router;
