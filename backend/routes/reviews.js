const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Review = require('../models/Review');

router.post('/', auth, async (req, res) => {
  try {
    const { gameId, rating, text } = req.body;
    if (!gameId || !rating) return res.status(400).json({ message: 'Missing fields' });

    const review = new Review({ user: req.user._id, game: gameId, rating, text });
    await review.save();
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server err' });
  }
});

module.exports = router;
