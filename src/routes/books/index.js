const handler = require('./handler');

module.exports = [
  {
    method: 'GET',
    path: '/books',
    handler: handler.getBooksHandler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: handler.createBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handler.getBookHandler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handler.editBookHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handler.deleteBookHandler,
  },
];
