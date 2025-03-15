// server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './src/routes/auth.js';  // import auth routes
import  formRoutes from './src/routes/forms.js';
import questionsRoutes from './src/routes/questions.js';
import responsesRoutes from './src/routes/responses.js';
import eventRoutes from './src/routes/events.js';
dotenv.config();
// import other routes as needed


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Mount routes
app.use('/auth', authRoutes);
// app.use('/users', usersRoutes); // if you have additional routes



app.use('/forms', formRoutes);
app.use('/events', eventRoutes);
app.use('/questions', questionsRoutes);
app.use('/responses', responsesRoutes);

app.use('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
