const RoomService = require("../services/room.service")
const Joi = require('joi');

const listAll = async (req, res) => {
  try {
    const rooms = await RoomService.listAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await RoomService.getById(id);
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ error: 'Could not fetch room' });
  }
};

const create = async (req, res) => {
  try {
    const room = await RoomService.create(req.body);
    res.status(201).json({ message: 'new room created', item: room });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Could not create room' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await RoomService.update(id, req.body);
    res.status(200).json({ message: 'room updated', item: room });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ error: 'Could not update room' });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await RoomService.deleteById(id);
    res.status(200).json({ message: 'room deleted', item: room });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Could not delete room' });
  }
};

module.exports = {
    listAll,
    getById,
    create,
    update,
    deleteById,
}
