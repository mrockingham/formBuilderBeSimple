// controllers/questionController.js
import db from "../db.js";

export const createQuestion = async (req, res) => {
  const { question_text, question_name, options, ...rest } = req.body;
  if (!question_text || !question_name) {
    return res.status(400).json({ error: "Question text and type are required." });
  }
  try {
    const optionsString = options ? JSON.stringify(options) : null;
    const ids = await db("questions").insert({
      question_text,
      
    //   options: optionsString,
      ...rest,
    });
    const id = ids[0];
    return res.json({ id, question_text, question_name, options });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const questions = await db("questions").select("*");
    // If the options column is stored as a string, parse it.
    const parsedQuestions = questions.map((q) => ({
      ...q,
      options: q.options ? JSON.parse(q.options) : null,
    }));
    return res.json({ questions: parsedQuestions });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const updateQuestion = async (req, res) => {
  const { id } = req.params;
  const { question_text, question_name, options, ...rest } = req.body;
  if (!question_text || !question_name) {
    return res.status(400).json({ error: "Question text and type are required." });
  }
  try {
    const optionsString = options ? JSON.stringify(options) : null;
    const updatedRows = await db("questions")
      .where({ question_id: id })
      .update({
        question_text,
        question_name,
        options: optionsString,
        ...rest,
      });
    if (updatedRows === 0) {
      return res.status(404).json({ error: "Question not found." });
    }
    return res.json({ message: "Question updated successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

export const deleteQuestion = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await db("questions").where({ question_id: id }).del();
    if (deletedRows === 0) {
      return res.status(404).json({ error: "Question not found." });
    }
    return res.json({ message: "Question deleted successfully." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};
