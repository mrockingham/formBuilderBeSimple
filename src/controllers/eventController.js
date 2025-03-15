import db from '../db.js';

/**
 * Create a new form, checking for duplicate titles.
 */
export const createEvent = async (req, res) => {
    const { title, event_data } = req.body;
    if (!title || !event_data) {
      return res.status(400).json({ error: 'Title and event_data are required' });
    }
    try {
      // Check for duplicate title.
      const existingEvent = await db('events').where({ title }).first();
      if (existingEvent) {
        return res.status(400).json({ error: 'A form with that title already exists.' });
      }
      // Insert new form (Knex returns an array of inserted ids).
      const [id] = await db('events').insert({
        title: event_data.title || null,
        start_date: event_data.start_date || null,
        end_date: event_data.end_date || null,
        location: event_data.location || null,
        created_at: new Date().toISOString(),
        background_color: event_data.background_color || null,
        primary_color: event_data.primary_color || null,
        campaign_code: event_data.campaign_code || null,
        event_type_id: event_data.event_type_id || null,
        active: event_data.active || null
        
      });
      return res.json({ id, title, event_data });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  };

  export const getEvents = async (req, res) => {
    try {
      const events = await db('events').select('*');
      return res.json({ events });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  };

  export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, event_data } = req.body;
  
    if (!title || !event_data) {
      return res.status(400).json({ error: 'Title and event_data are required' });
    }
  
    try {
      // Check for duplicate title in other records.
      const duplicate = await db('events')
        .where({ title })
        .andWhereNot({ id })
        .first();
      if (duplicate) {
        return res.status(400).json({ error: 'Another form with that title already exists.' });
      }
      const updatedRows = await db('events')
        .where({ id })
        .update({
            title: event_data.title || null,
            start_date: event_data.start_date || null,
            end_date: event_data.end_date || null,
            location: event_data.location || null,
        
            updated_at: new Date().toISOString(),
            background_color: event_data.background_color || null,
            primary_color: event_data.primary_color || null,
            campaign_code: event_data.campaign_code || null,
            event_type_id: event_data.event_type_id || null,
            active: event_data.active || null
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

  export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedRows = await db('events').where({ id }).del();
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Form not found.' });
      }
      return res.json({ message: 'Form deleted successfully.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: err.message });
    }
  };