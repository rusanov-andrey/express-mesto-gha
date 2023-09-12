const jwt = require('jsonwebtoken');

const { sendUnauthorized } = require('../utils/error');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return sendUnauthorized(res);
  }

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return sendUnauthorized(res);
  }

  req.user = payload;
  return next();
};
