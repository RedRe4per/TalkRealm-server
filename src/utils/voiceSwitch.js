const voiceSwitch = (users, voice, peerId) => {
  let state;

  switch (voice) {
    case 'on':
      state = true;
      break;
    case 'off':
      state = false;
      break;
    default:
      console.error(`Invalid voice state: ${voice}`);
      return;
  }

  users.forEach((user) => {
    if (user.userPeerId === peerId) {
      user.voice = state;
    }
  });
};

module.exports = {
  voiceSwitch,
};
