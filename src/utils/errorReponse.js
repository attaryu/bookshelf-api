const errorResponse = (message) => ({
  status: 'error',
  message,
});

module.exports = errorResponse;
