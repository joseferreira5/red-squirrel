const mongoose = require('mongoose');

let MONGODB_URI =
  process.env.PROD_MONGODB || 'mongodb://mongo:27017/redSquirrelDatabase';

mongoose
  .connect(MONGODB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log('Successfully connected to MongoDB.');
  })
  .catch(e => {
    console.error('Connection error', e.message);
  });

const db = mongoose.connection;

module.exports = db;
