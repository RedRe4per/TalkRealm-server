const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    messages: [{
        userName: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    }],
    roomId: {
        type: mongoose.Types.ObjectId,
        ref: "Room",
        required: true,
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

})

const Model = mongoose.model('Chat', schema);
module.exports = Model;