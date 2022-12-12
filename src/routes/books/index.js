const handler = require('./handler');

module.exports = [
  {
    method: 'GET',
    path: '/books',
    handler: handler.getBooksHadler,
  },
  {
    method: 'POST',
    path: '/books',
    handler: handler.createBooksHadler,
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: handler.getBookHadler,
  },
  {
    method: 'PUT',
    path: '/books/{bookId}',
    handler: handler.editBookHadler,
  },
  {
    method: 'DELETE',
    path: '/books/{bookId}',
    handler: handler.deleteBookHadler,
  },
];
