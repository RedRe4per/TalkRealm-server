require('dotenv').config();
const server = require('../app');
const { connectToDB } = require('./database/connect');

connectToDB();

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
