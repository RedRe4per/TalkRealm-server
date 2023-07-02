const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./src/middleware/errorHandler');
const socketSetup = require('./src/utils/socket');
const app = express();
require('express-async-errors');
const router = require('./src/routes');

const http = require('http');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(errorHandler);
app.use(`/${process.env.ENVIRONMENT}`, router);

const server = http.createServer(app);
socketSetup(server);

module.exports = server;
