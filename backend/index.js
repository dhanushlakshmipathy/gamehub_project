require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const gamesRouter = require('./routes/games');
const authRouter = require('./routes/auth');
const reviewsRouter = require('./routes/reviews');
const listsRouter = require('./routes/lists');
const usersRouter = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/games', gamesRouter);
app.use('/api/auth', authRouter);
app.use('/api/reviews', reviewsRouter);
app.use('/api/lists', listsRouter);
app.use('/api/users', usersRouter);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('Mongo connection error:', err);
});
