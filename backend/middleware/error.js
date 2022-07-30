const errorHander = require('../utils/errorHander');

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  //wrong mongoDB Id error
  if (err.name === 'castError') {
    const message = `resourse not found. Invalid: ${err.path}`;
    err = new errorHander(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    error: err.message,
  });
};
