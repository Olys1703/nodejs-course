const uuid = require('uuid');

const Column = require('../columns/column.model.js');

class Board {
  constructor({ id = uuid(), title = 'Board', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new Column(column));
  }

  static toResponse(board) {
    const { id, title, columns } = board;

    return { id, title, columns: columns.map(Column.toResponse) };
  }
}

module.exports = Board;
