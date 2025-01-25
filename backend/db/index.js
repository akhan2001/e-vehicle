const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
require('dotenv').config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'mabdullahkhan567';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'w4mJ4FH3Xp93ca6';
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'cluster0';
const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME || 'mydatabase';
const MONGO_PORT = process.env.MONGO_PORT || 27017;

/**
 * Connect to the MongoDB database
 */
async function connect() {
  try {
    let MONGO_URI;

    if (process.env.NODE_ENV === 'test') {
      const mongod = await MongoMemoryServer.create();
      MONGO_URI = mongod.getUri();
    } else {
      MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}.jhzdx.mongodb.net/${MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;
    }

    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

/**
 * Disconnect from the MongoDB database
 * @return {Promise} Promise that resolves when the connection is closed
 */
function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
