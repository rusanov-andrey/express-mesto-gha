const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getUserss, createUser, getOneUser, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');

router.get('/users', getUserss);
router.post('/users', createUser);
router.get('/users/me', getCurrentUser);
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().regex(/[\da-z]{24}/),
  }),
}), getOneUser);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }).unknown(true),
}), updateProfile);
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(/https?:\/\/(www.)?[\dA-Za-z-._~:/?#[\]@!$&'()*+,;=]*#?/),
  }).unknown(true),
}), updateAvatar);

module.exports = router;
