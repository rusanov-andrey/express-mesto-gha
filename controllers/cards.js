const Card = require('../models/card');
const {
  sendNotFound, sendForbiden, sendBadRequest, sendInternalError,
} = require('../utils/error');

function getCards(req, res) {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch((err) => {
      sendInternalError(res, err);
    });
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendBadRequest(res);
        return;
      }
      sendInternalError(res, err);
    });
}

function deleteCard(req, res) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        return sendNotFound(res);
      }

      if (card.owner.toString() !== req.user._id) {
        return sendForbiden(res);
      }

      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((card) => {
      if (!res.writableEnded) {
        res.send(card);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendBadRequest(res);
        return;
      }
      sendInternalError(res, err);
    });
}

function addLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        sendNotFound(res);
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendBadRequest(res);
        return;
      }
      sendInternalError(res, err);
    });
}

function deleteLike(req, res) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true, runValidators: true },
  )
    .then((card) => {
      if (!card) {
        sendNotFound(res);
        return;
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendBadRequest(res);
        return;
      }
      sendInternalError(res, err);
    });
}

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLike,
  deleteLike,
};
