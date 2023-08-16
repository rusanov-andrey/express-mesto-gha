const User = require('../models/user');
const { sendNotFound, sendBadRequest, sendInternalError } = require('../utils/error');

function getUserss(req, res) {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      sendInternalError(res, err);
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendBadRequest(res);
        return;
      }
      sendInternalError(res, err);
    });
}

function getOneUser(req, res) {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        sendNotFound(res);
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        sendBadRequest(res);
        return;
      }
      sendInternalError(res, err);
    });
}

function updateProfile(req, res) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        sendNotFound(res);
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendBadRequest(res);
        return;
      }
      sendInternalError(res, err);
    });
}

function updateAvatar(req, res) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        sendNotFound(res);
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        sendBadRequest(res);
        return;
      }
      sendInternalError(res, err);
    });
}

module.exports = {
  getUserss,
  createUser,
  getOneUser,
  updateProfile,
  updateAvatar,
};
