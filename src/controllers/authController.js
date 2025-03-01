// controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db('users').where({ email }).first();
    console.log(user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // const isValid = await bcrypt.compare(password, user.password);
    // if (!isValid) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getUser = async (req, res) => {
  try {
    // req.user is set by the authentication middleware.
    const user = await db('users').where({ id: req.user.id }).first();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
};
