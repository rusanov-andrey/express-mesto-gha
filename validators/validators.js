const { Joi } = require('celebrate');

module.exports.validator = {
  _id: Joi.string().required().regex(/[\da-z]{24}/),
  user: {
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/https?:\/\/(www.)?[\dA-Za-z-._~:/?#[\]@!$&'()*+,;=]*#?/),
  },
  card: {
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(/https?:\/\/(www.)?[\dA-Za-z-._~:/?#[\]@!$&'()*+,;=]*#?/),
  },
};
