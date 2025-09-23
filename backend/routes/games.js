const express = require('express');
const router = express.Router();
const Game = require('../models/Game');

// GET /api/games?search=...&limit=...
router.get('/', async (req, res) => {
  try {
    const q = {};
    if (req.query.search) {
      q.title = { $regex: req.query.search, $options: 'i' };
    }
    const limit = parseInt(req.query.limit) || 30;
    const games = await Game.find(q).limit(limit);
    res.json(games);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET single game
router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);
    if (!game) return res.status(404).json({ message: 'Game not found' });
    res.json(game);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
