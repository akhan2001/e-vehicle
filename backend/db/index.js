const mongoose = require('mongoose');
const {MongoMemoryServer} = require('mongodb-memory-server');

const MONGO_USERNAME = process.env.MONGO_USERNAME || 'root';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'example';
const MONGO_HOSTNAME = process.env.MONGO_HOSTNAME || 'localhost';
const MONGO_PORT = process.env.MONGO_PORT || 27017;
// const MONGO_DATABASE_NAME = process.env.MONGO_DATABASE_NAME ||'posts';

/**
 * placeholder for jsdoc documentation
 **/
async function connect() {
  // return new Promise((resolve, reject) => {

  if (process.env.NODE_ENV === 'test') {
    const mongod = await MongoMemoryServer.create();
    MONGO_URI = mongod.getUri();
  } else {
    MONGO_URI = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}`;
  }
  mongoose.set('strictQuery', true);
  mongoose.connect(MONGO_URI,
      {useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then((res, err) => {
        if (err) {
          console.log(err);
        }
        return (res);
      });

  // });
}

/**
 * placeholder for jsdoc documentation
 * @return {type}
 **/
function close() {
  return mongoose.disconnect();
}

module.exports = {connect, close};
