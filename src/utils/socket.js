const { Server } = require('socket.io');
const { stateSwitch } = require('./stateSwitch');
let channelUsers = [];

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
      io.emit('message', 'message');
    });

    // socket.on('join-room', (userId) => {
    //   console.log("first11111")
    //   //socket.join(roomId);
    //   socket.broadcast.emit('user-connected', userId) //to(roomId)
    // })

    socket.on('I-connected', (userObj) => {
      console.log('User connected', userObj.userPeerId);
      channelUsers.push(userObj);
      //socket.join(roomId2);
      socket.broadcast.emit('user-connected', {
        userObj: userObj,
        channelUsers: channelUsers,
      }); //to(roomId)
      socket.emit('user-connected', {
        userObj: userObj,
        channelUsers: channelUsers,
      });

      socket.on('disconnect', () => {
        const index = channelUsers.findIndex(
          (user) => user.userPeerId === userObj.userPeerId,
        );
        if (index > -1) {
          channelUsers.splice(index, 1);
        }
        socket.broadcast.emit('user-disconnected', {
          userObj: userObj,
          channelUsers: channelUsers,
        });
      });
    });

    socket.on('video-on', (peerId) => {
      socket.broadcast.emit('remote-video-on', peerId);
      stateSwitch(channelUsers, 'video', 'on', peerId);
    });

    socket.on('video-off', (peerId) => {
      socket.broadcast.emit('remote-video-off', peerId);
      stateSwitch(channelUsers, 'video', 'off', peerId);
    });

    socket.on('audio-on', (peerId) => {
      socket.broadcast.emit('remote-audio-on', peerId);
      stateSwitch(channelUsers, 'audio', 'on', peerId);
    });

    socket.on('audio-off', (peerId) => {
      socket.broadcast.emit('remote-audio-off', peerId);
      stateSwitch(channelUsers, 'audio', 'off', peerId);
    });

    socket.on('screen-on', (peerId) => {
      socket.broadcast.emit('remote-screen-on', peerId);
      stateSwitch(channelUsers, 'screen', 'on', peerId);
    });

    socket.on('screen-off', (peerId) => {
      socket.broadcast.emit('remote-screen-off', peerId);
      stateSwitch(channelUsers, 'screen', 'off', peerId);
    });

    socket.on('I-disconnect', (userId) => {
      const index = channelUsers.findIndex(
        (user) => user.userPeerId === userId,
      );
      if (index > -1) {
        channelUsers.splice(index, 1);
      }
      socket.broadcast.emit('user-disconnected', {
        userId: userId,
        channelUsers: channelUsers,
      });
    });
  });
};
