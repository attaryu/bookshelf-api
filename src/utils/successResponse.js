const successResponse = (message, payload) => ({
  status: 'success',
  message,
  data: {
    ...payload,
  },
});

module.exports = successResponse;
