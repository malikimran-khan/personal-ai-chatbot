const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userId: String,
  history: [String],
  summary: String,
});

module.exports = mongoose.model('ChatSession', chatSchema);
