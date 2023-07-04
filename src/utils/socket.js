const { Server } = require('socket.io');

let users = [];


module.exports = function (server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

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

    socket.on('I-connected', (userObj) => {
      console.log('User connected', userObj.userPeerId);
      users.push(userObj);
      //socket.join(roomId2);
      socket.broadcast.emit('user-connected', {
        userObj: userObj,
        users: users,
      }); //to(roomId)
      socket.emit('user-connected', { userObj: userObj, users: users });

      socket.on('disconnect', () => {
        console.log('User disconnected', userObj);
        const index = users.findIndex(
          (user) => user.userPeerId === userObj.userPeerId,
        );
        if (index > -1) {
          users.splice(index, 1);
        }
        socket.broadcast.emit('user-disconnected', {
          userObj: userObj,
          users: users,
        });
      });
    });

    socket.on('camera-close', (outgoingIds) => {
      socket.broadcast.emit('remote-camera-close', outgoingIds);
    });

    socket.on('voice-on', (peerId) => {
      socket.broadcast.emit('remote-voice-on', peerId);
    });

    socket.on('voice-off', (peerId) => {
      socket.broadcast.emit('remote-voice-off', peerId);
    });

    socket.on('I-disconnect', (userId) => {
      console.log('User disconnected', userId);
      const index = users.findIndex((user) => user.userPeerId === userId);
      if (index > -1) {
        users.splice(index, 1);
      }
      socket.broadcast.emit('user-disconnected', {
        userId: userId,
        users: users,
      });
    });
  });
};
