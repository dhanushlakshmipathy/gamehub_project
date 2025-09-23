const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  rawgId: { type: Number, index: true, unique: true, sparse: true },
  title: { type: String, required: true },
  slug: String,
  description: String,
  released: String,
  platforms: [String],
  genres: [String],
  cover: String,
  rating: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Game', gameSchema);
