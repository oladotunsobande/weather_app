require('dotenv').config();

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const options = {
  keepAlive: true,
  connectTimeoutMS: 30000,
  socketTimeoutMS: 0,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

let connection;

if (process.env.DEBUG != undefined) {
  connection = mongoose.createConnection();
  const mongoMemoryServer = new MongoMemoryServer();
  mongoMemoryServer.getConnectionString().then((mongoURI) => {
    connection.openUri(mongoURI, options, (err) => {
      if (err) {
        console.log('Test DB connection failed');
        process.exit(1);
      }
      console.log('Test DB connected');
      require('./initModels');
    });
  });
} else {
  const db_uri = process.env.MONGO_URL || process.env.DB_URL;

  connection = mongoose.createConnection(
    db_uri,
    options,
    (error) => {
      if (error) {
        console.log('DB connection failed');
        process.exit(1);
      }
      console.log('DB connected');
      require('./initModels');
    }
  );
}

module.exports = connection;
