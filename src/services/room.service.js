const Room = require("../models/room")
const ChatService = require("./chat.service")
const {getCurrentTimestamp} = require("../utils/time")

const listAll = async () => {
    return await Room.find({isDeleted: false}).limit(50).exec();
};

const getById = async (id) => {
    return await Room.findById(id).exec();
};

const create = async (body) => {
    const room = new Room({
        ...body,
    });
    const chat = await ChatService.create({roomId: room.id});
    room.chatId = chat.id;
    await room.save();

    return room;
};

const update = async (id, body) => {
    const { roomName } = body;
    const room = await Room.findByIdAndUpdate(id, {
        roomName, updatedAt: getCurrentTimestamp(),
    }, { new: true }).exec();

    return room
};

const deleteById = async (id) => {
    const room = await Room.findByIdAndUpdate(
        id,
        {
            isDeleted: true,
            updatedAt: getCurrentTimestamp()
        }, { new: true }
    ).exec();;
    return room
};

module.exports = {
    listAll,
    getById,
    create,
    update,
    deleteById,
}