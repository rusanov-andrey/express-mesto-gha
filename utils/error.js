/* eslint-disable max-classes-per-file */

/* function sendNotFound(res) {
  return res.status(404).send({ message: 'Ресурсс не найден' });
}

function sendBadRequest(res) {
  return res.status(400).send({ message: 'Переданы некорректные данные' });
}

function sendUnauthorized(res) {
  return res.status(401).send({ message: 'Неправильные почта или пароль' });
}

function sendForbiden(res) {
  return res.status(403).send({ message: 'Нет прав' });
}

function sendConflict(res) {
  return res.status(409).send({ message: 'Нарушена уникальность' });
}

function sendInternalError(res, err) {
  return res.status(500).send({ message: `Ошибка сервера ${err.name} [${err.code}]` });
} */

class MestoError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }
}

class NotFoundError extends MestoError {
  constructor(message = 'Ресурсс не найден') {
    super(404, message);
  }
}

class BadRequestError extends MestoError {
  constructor(message = 'Переданы некорректные данные') {
    super(400, message);
  }
}

class NotAuthorizedError extends MestoError {
  constructor(message = 'Неправильные почта или пароль') {
    super(401, message);
  }
}

class ForbidenError extends MestoError {
  constructor(message = 'Нет прав') {
    super(403, message);
  }
}

class ConflictError extends MestoError {
  constructor(message = 'Нарушена уникальность') {
    super(409, message);
  }
}

class CommonError extends MestoError {
  constructor(message = 'Ошибка сервера') {
    super(500, message);
  }
}

module.exports = {
/*  sendNotFound,
  sendBadRequest,
  sendUnauthorized,
  sendForbiden,
  sendConflict,
  sendInternalError, */

  MestoError,
  NotFoundError,
  BadRequestError,
  NotAuthorizedError,
  ForbidenError,
  ConflictError,
  CommonError,
};
