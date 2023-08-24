const { connect, connection } = require('mongoose');


const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.nsjkc8t.mongodb.net/socialDB';

connect(connectionString);

module.exports = connection;
