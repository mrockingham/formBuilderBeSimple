// src/controllers/formController.js
import db from '../db.js';

/**
 * Create a new form, checking for duplicate titles.
 */
export const createForm = async (req, res) => {
  const { title, form_data } = req.body;
  if (!title || !form_data) {
    return res.status(400).json({ error: 'Title and form_data are required' });
  }
  try {
    // Check for duplicate title.
    const existingForm = await db('forms').where({ title }).first();
    if (existingForm) {
      return res.status(400).json({ error: 'A form with that title already exists.' });
    }
    // Insert new form (Knex returns an array of inserted ids).
    const [id] = await db('forms').insert({
      title,
      form_data: JSON.stringify(form_data),
    });
    return res.json({ id, title, form_data });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Retrieve all forms.
 */
export const getForms = async (req, res) => {
  try {
    const forms = await db('forms').select('*');
    return res.json({ forms });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Update an existing form.
 */
export const updateForm = async (req, res) => {
  const { id } = req.params;
  const { title, form_data } = req.body;

  if (!title || !form_data) {
    return res.status(400).json({ error: 'Title and form_data are required' });
  }

  try {
    // Check for duplicate title in other records.
    const duplicate = await db('forms')
      .where({ title })
      .andWhereNot({ id })
      .first();
    if (duplicate) {
      return res.status(400).json({ error: 'Another form with that title already exists.' });
    }
    const updatedRows = await db('forms')
      .where({ id })
      .update({
        title,
        form_data: JSON.stringify(form_data),
      });
    if (updatedRows === 0) {
      return res.status(404).json({ error: 'Form not found.' });
    }
    return res.json({ message: 'Form updated successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

/**
 * Delete a form.
 */
export const deleteForm = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await db('forms').where({ id }).del();
    if (deletedRows === 0) {
      return res.status(404).json({ error: 'Form not found.' });
    }
    return res.json({ message: 'Form deleted successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
