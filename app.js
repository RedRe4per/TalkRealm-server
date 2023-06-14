const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const errorHandler = require('./src/middleware/errorHandler');
const app = express();
require('express-async-errors');
const router = require('./src/routes');

const http = require('http');
const { Server } = require('socket.io');

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(errorHandler);
app.use(`/${process.env.ENVIRONMENT}`, router);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    //   origin: "http://localhost:3000",
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('offer', (offer) => {
    console.log('Offer received');
    // TODO: 你需要决定将 offer 发送给谁，这里简单地将其发送给所有连接的客户端（除了发送者自己）
    socket.broadcast.emit('offer', offer);
  });

  socket.on('answer', (answer) => {
    console.log('Answer received');
    // TODO: 你需要决定将 answer 发送给谁，这里简单地将其发送给所有连接的客户端（除了发送者自己）
    socket.broadcast.emit('answer', answer);
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

module.exports = server;
