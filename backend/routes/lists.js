const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const List = require('../models/List');

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, games, isPublic } = req.body;
    const list = new List({ owner: req.user._id, title, description, games, isPublic });
    await list.save();
    res.json(list);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server err' });
  }
});

module.exports = router;
