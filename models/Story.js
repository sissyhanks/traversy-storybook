const mongoose = require('mongoose');

const StorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },

  body: {
    type: String,
    required: true
  },

  status: {
    type: String,
    default: 'public',
    // wut is enum all about?
    enum: ['public', 'private']
  },

  user: {
    // what is this relational model type thing all about???
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },

  createdAt : {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Story', StorySchema);