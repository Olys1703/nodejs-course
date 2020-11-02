const mongoose = require('mongoose');
const uuid = require('uuid');
const bcrypt = require('bcrypt');

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
    required: true
  }
});

schema.pre('save', async function save(next) {
  try {
    const user = this;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    return next();
  } catch (err) {
    return next(err);
  }
});

schema.methods.comparePassword = async function comparePassword(
  candidatePassword
) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new Error(err);
  }
};

schema.statics.toResponse = user => {
  const { _id, name, login } = user;

  return { id: _id, name, login };
};

const User = mongoose.model('User', schema);

module.exports = User;
