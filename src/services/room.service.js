const Room = require("../models/room")
const {getCurrentTimestamp} = require("../utils/time")

export const listAll = async () => {
    return Room.find().limit(50).exec();
};

export const getById = async (id) => {
    return Room.findById(id);
};

export const create = async (body) => {
    const room = new Room({
        ...body,
    });
    room.save();

    return room;
};

export const update = async (id, body) => {
    const { name, email } = body;
    const room = await Room.findByIdAndUpdate(id, {
        name, email, updatedAt: getCurrentTimestamp(),
    }, { new: true }).exec();

    return room
};

export const deleteById = async (id) => {
    const room = Room.findByIdAndUpdate(
        id,
        {
            isDeleted: true,
            updatedAt: getCurrentTimestamp()
        }, { new: true }
    ).exec();;
    return room
};