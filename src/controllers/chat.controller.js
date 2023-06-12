const ChatService = require("../services/chat.service")
const Joi = require('joi');

const listAll = async (req, res) => {
  try {
    const chats = await ChatService.listAll();
    res.status(200).json(chats);
  } catch (error) {
    console.error('An error ocurred:', error);
    res.status(500).json(error);
  }
};

const getById = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await ChatService.getById(id);
    res.status(200).json(chat);
  } catch (error) {
    console.error('Error fetching chat:', error);
    res.status(500).json({ error: 'Could not fetch chat' });
  }
};

const create = async (req, res) => {
  try {
    const chat = await ChatService.create(req.body);
    res.status(201).json({ message: 'new chat created', item: chat });
  } catch (error) {
    console.error('Error creating chat:', error);
    res.status(500).json({ error: 'Could not create chat' });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await ChatService.update(id, req.body);
    res.status(200).json({ message: 'chat updated', item: chat });
  } catch (error) {
    console.error('Error updating chat:', error);
    res.status(500).json({ error: 'Could not update chat' });
  }
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  try {
    const chat = await ChatService.deleteById(id);
    res.status(200).json({ message: 'chat deleted', item: chat });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({ error: 'Could not delete chat' });
  }
};

module.exports = {
    listAll,
    getById,
    create,
    update,
    deleteById,
}
