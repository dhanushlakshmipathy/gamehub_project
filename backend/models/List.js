const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: String,
  games: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }],
  isPublic: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('List', listSchema);
