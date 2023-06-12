const Room = require("../models/room")
const {getCurrentTimestamp} = require("../utils/time")

const listAll = async () => {
    return Room.find({isDeleted: false}).limit(50).exec();
};

const getById = async (id) => {
    return Room.findById(id);
};

const create = async (body) => {
    const room = new Room({
        ...body,
    });
    room.save();

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
    const room = Room.findByIdAndUpdate(
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