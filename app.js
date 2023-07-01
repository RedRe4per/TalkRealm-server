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
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

let users = [];

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', (message) => {
    console.log('hello');
    io.emit('message', 'message');
  });

  // socket.on('join-room', (userId) => {
  //   console.log("first11111")
  //   //socket.join(roomId);
  //   socket.broadcast.emit('user-connected', userId) //to(roomId)
  // })

  socket.on('I-connected', (userId) => {
    console.log('User connected', userId);
    users.push(userId);
    //socket.join(roomId2);
    socket.broadcast.emit('user-connected', { userId: userId, users: users }); //to(roomId)
    socket.emit('user-connected', { userId: userId, users: users });

    socket.on('disconnect', () => {
      console.log('User disconnected', userId);
      const index = users.indexOf(userId);
      if (index > -1) {
        users.splice(index, 1);
      }
      socket.broadcast.emit('user-disconnected', {
        userId: userId,
        users: users,
      });
    });
  });

  socket.on('I-disconnect', (userId) => {
    console.log('User disconnected', userId);
    const index = users.indexOf(userId);
    if (index > -1) {
      users.splice(index, 1);
    }
    socket.broadcast.emit('user-disconnected', {
      userId: userId,
      users: users,
    });
  });
});

module.exports = server;
