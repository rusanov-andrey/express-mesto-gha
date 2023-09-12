const { celebrate, Joi } = require('celebrate');

const router = require('express').Router();
const {
  getCards, createCard, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

router.get('/cards', getCards);
router.post('/cards', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().required().regex(/https?:\/\/(www.)?[\dA-Za-z-._~:/?#[\]@!$&'()*+,;=]*#?/),
  }).unknown(true),
}), createCard);
router.delete('/cards/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().regex(/[\da-z]{24}/),
  }),
}), deleteCard);
router.put('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().regex(/[\da-z]{24}/),
  }),
}), addLike);
router.delete('/cards/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().regex(/[\da-z]{24}/),
  }),
}), deleteLike);

module.exports = router;
