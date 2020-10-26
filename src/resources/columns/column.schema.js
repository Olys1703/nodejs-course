const mongoose = require('mongoose');
const uuid = require('uuid');

const { Schema } = mongoose;

const schema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  order: {
    type: Number,
    default: 0
  }
});

schema.statics.toResponse = column => {
  const { _id, title, order } = column;

  return { id: _id, title, order };
};

module.exports = schema;
