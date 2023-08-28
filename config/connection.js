// requiring our connection to mongoose
const { connect, connection } = require('mongoose');

// our url to our database
const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://root:root@cluster0.nsjkc8t.mongodb.net/socialDB';

// connecting to our database using our variable for the url
connect(connectionString);

module.exports = connection;
