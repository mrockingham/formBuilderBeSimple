// src/routes/forms.js
import express from 'express';
import db from '../db.js';

const router = express.Router();

// POST /forms - Create a new form
router.post('/', async (req, res) => {
  const { title, form_data } = req.body;
  if (!title || !form_data) {
    return res.status(400).json({ error: 'Title and form_data are required' });
  }
  try {
    // Insert the new form using Knex's query builder.
    // Knex returns an array with the inserted row's id.
    const [id] = await db('forms').insert({
      title,
      form_data: JSON.stringify(form_data),
    });
    res.json({ id, title, form_data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /forms - Retrieve all forms
router.get('/', async (req, res) => {
  try {
    const forms = await db('forms').select('*');
    res.json({ forms });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
