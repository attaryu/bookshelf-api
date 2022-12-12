const books = require('./books');

module.exports = [
  {
    method: '*',
    path: '/{any*}',
    handler(request, h) {
      return h.response({
        status: 'error',
        message: 'URL Request di luar jangkauan',
      }).code(404);
    },
  },
  ...books,
];
