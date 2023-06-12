const express = require('express');
const {
  listAll,
  getById,
  create,
  update,
  deleteById,
} = require('../controllers/room.controller');

const roomRouter = express.Router();
roomRouter.get('', listAll);
roomRouter.get('/:id', getById);
roomRouter.post('', create);
roomRouter.put('/:id', update);
roomRouter.delete('/:id', deleteById);

module.exports = roomRouter;
