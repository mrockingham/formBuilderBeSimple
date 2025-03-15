// controllers/responseController.js
import db from "../db.js";

export const createResponse = async (req, res) => {
  const { submission_id, question_id, option_id, value } = req.body;
  if (!submission_id || !question_id) {
    return res.status(400).json({ error: "Submission ID and question ID are required." });
  }
  try {
    const ids = await db("responses").insert({
      submission_id,
      question_id,
      option_id: option_id || null,
      value: value || null,
    });
    const id = ids[0];
    return res.json({ id, submission_id, question_id, option_id, value });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const getResponses = async (req, res) => {
  try {
    const responses = await db("responses").select("*");
    return res.json({ responses });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const updateResponse = async (req, res) => {
  const { id } = req.params;
  const { submission_id, question_id, option_id, value } = req.body;
  try {
    const updatedRows = await db("responses")
      .where({ response_id: id })
      .update({
        submission_id,
        question_id,
        option_id: option_id || null,
        value: value || null,
      });
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Response not found." });
    }
    return res.json({ message: "Response updated successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const deleteResponse = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await db("responses").where({ response_id: id }).del();
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Response not found." });
    }
    return res.json({ message: "Response deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
