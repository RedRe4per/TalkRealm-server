const stateSwitch = (channelUsers, attribute, boolean, peerId) => {
  let state;

  switch (boolean) {
    case 'on':
      state = true;
      break;
    case 'off':
      state = false;
      break;
    default:
      console.error(`Invalid state: ${voice}`);
      return;
  }

  channelUsers.forEach((user) => {
    if (user.userPeerId === peerId) {
      user[attribute] = state;
    }
  });
};

module.exports = {
  stateSwitch,
};
