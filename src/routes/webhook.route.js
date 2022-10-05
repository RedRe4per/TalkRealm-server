const express = require('express');
const { 
    webhookHandler
} = require('../controllers/webhook.controller');

const webhookRouter = express.Router();
webhookRouter.post('', webhookHandler);

module.exports = webhookRouter;