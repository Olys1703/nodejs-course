const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const schema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  name: String,
  login: String,
  password: {
    type: String,
    required: true,
    select: false
  }
});

schema.statics.toResponse = user => {
  const { _id, name, login } = user;

  return { id: _id, name, login };
};

const User = mongoose.model('User', schema);

module.exports = User;
