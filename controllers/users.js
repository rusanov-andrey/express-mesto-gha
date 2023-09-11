const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const {
  sendNotFound, sendBadRequest, sendUnauthorized, sendInternalError,
} = require('../utils/error');

function getUserss(req, res) {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      sendInternalError(res, err);
    });
}

function createUser(req, res) {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, hash,
    }))
    .then((user) => res.status(201).send(user))
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

function getCurrentUser(req, res) {
  req.params.userId = req.user._id;
  getOneUser(req, res);
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

function login(req, res) {
  const { email, password } = req.body;

  let userId = null;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      userId = user._id;
      return bcrypt.compare(password, user.password);
    })
    .then((matched) => {
      if (!matched) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }
      const token = jwt.sign({ _id: userId }, 'some-secret-key', {
        expiresIn: '7d',
        httpOnly: true,
      });
      res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7 });
      return res.send({});
    })
    .catch(() => {
      sendUnauthorized(res);
    });
}

module.exports = {
  getUserss,
  createUser,
  getOneUser,
  getCurrentUser,
  updateProfile,
  updateAvatar,
  login,
};
