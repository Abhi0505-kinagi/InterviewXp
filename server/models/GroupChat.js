const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true,
    index: true
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true
  },
  messageType: {
    type: String,
    enum: ['text', 'link', 'file'],
    default: 'text'
  },
  metadata: {
    title: String,
    url: String,
    thumbnail: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400 // optional: auto-delete after 24h
  }
});

module.exports = mongoose.model('Message', MessageSchema);
