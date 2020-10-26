const mongoose = require('mongoose');
const config = require('./common/config.js');

mongoose.set('useFindAndModify', false);

module.exports = mongoose.connect(config.MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
