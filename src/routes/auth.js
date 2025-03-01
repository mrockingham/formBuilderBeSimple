// routes/auth.js
import express from 'express';
import { login, getUser } from '../controllers/authController.js';
import authenticate from '../middleware/authenticate.js';

const router = express.Router();

// POST /auth/login
router.post('/login', login);

// GET /auth/user - Protected route
router.get('/user', authenticate, getUser);

export default router;
