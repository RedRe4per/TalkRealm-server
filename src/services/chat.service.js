const Chat = require("../models/chat")
const { getCurrentTimestamp } = require("../utils/time")

const listAll = async () => {
    return await Chat.find({isDeleted: false}).limit(50).exec();
};

const getById = async (id) => {
    return await Chat.findById(id).exec();
};

const create = async (body) => {
    const {roomId} = body;
    const chat = new Chat({
       roomId: roomId,
       messages: [],
    });
    chat.save();

    return chat;
};

const update = async (id, body) => {
    const { newMessage } = body;

    const updatedChat = await Chat.findByIdAndUpdate(id, {
        $push: {
            messages: {
                $each: [{
                    userName: newMessage.userName,
                    text: newMessage.text,
                    createdAt: new Date()
                }],
                $position: 0,
                $slice: 50
            }
        },
        $set: { updatedAt: getCurrentTimestamp() },
    }, { new: true }).exec();

    return updatedChat;
};

const deleteById = async (id) => {
    const chat = await Chat.findByIdAndUpdate(
        id,
        {
            isDeleted: true,
            updatedAt: getCurrentTimestamp()
        }, { new: true }
    ).exec();;
    return chat
};

module.exports = {
    listAll,
    getById,
    create,
    update,
    deleteById,
}