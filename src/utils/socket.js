const { Server } = require('socket.io');
const { voiceSwitch } = require('./voiceSwitch');
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
      // socket.broadcast.emit('user-connected', {
      //   userObj: userObj,
      //   users: users,
      // }); //to(roomId)
      // socket.emit('user-connected', { userObj: userObj, users: users });
      

      socket.on('findVoiceOn', (peerId) => {
        socket.broadcast.emit('user-connected', {
          userObj: userObj,
          users: users,
        }); //to(roomId)
        socket.emit('user-connected', { userObj: userObj, users: users });
        users.forEach((userObj)=>{
        if(userObj.voice){
          socket.broadcast.emit('user-connected', {
            userObj: userObj,
            users: users,
          }); //to(roomId)
          socket.emit('user-connected', { userObj: userObj, users: users });
          socket.emit('remote-voice-on', userObj.userPeerId);
        }
      })
      })


      socket.on('disconnect', () => {
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
      voiceSwitch(users, 'on', peerId);
    });

    socket.on('voice-off', (peerId) => {
      socket.broadcast.emit('remote-voice-off', peerId);
      voiceSwitch(users, 'off', peerId);
    });

    socket.on('I-disconnect', (userId) => {
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
