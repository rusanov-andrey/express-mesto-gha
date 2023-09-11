const jwt = require('jsonwebtoken');

const { sendUnauthorized } = require('../utils/error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return sendUnauthorized(res);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;
  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return sendUnauthorized(res);
  }

  req.user = payload;
  return next();
};
