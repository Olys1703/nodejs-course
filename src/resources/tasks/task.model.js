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
  },
  description: String,
  userId: String,
  boardId: String,
  columnId: String
});

schema.statics.toResponse = task => {
  const { _id, title, order, description, userId, boardId, columnId } = task;

  return { id: _id, title, order, description, userId, boardId, columnId };
};

const Task = mongoose.model('Task', schema);

module.exports = Task;
