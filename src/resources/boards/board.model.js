const mongoose = require('mongoose');
const uuid = require('uuid');

const columnSchema = require('../columns/column.schema.js');

const { Schema } = mongoose;

const schema = new Schema({
  _id: {
    type: String,
    default: uuid
  },
  title: String,
  columns: [columnSchema]
});

schema.statics.toResponse = board => {
  const { _id, title, columns } = board;

  return { id: _id, title, columns };
};

const Board = mongoose.model('Board', schema);

module.exports = Board;
