const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  creator: {
    creatorId: {
      type: String,
      required: true,
    },
    creatorName: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
  },
  users: [
    {
      userId: {
        type: String,
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
      isOnline: {
        type: Boolean,
        default: false,
      },
    },
  ],
  chatId: {
    type: mongoose.Types.ObjectId,
    ref: 'Chat',
  },
  roomName: {
    type: String,
    default: 'Untitled',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
  },
});

const Model = mongoose.model('Room', schema);
module.exports = Model;
