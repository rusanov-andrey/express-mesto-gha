function sendNotFound(res) {
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

function sendInternalError(res, err) {
  return res.status(500).send({ message: `Ошибка сервера ${err.name}` });
}

module.exports = {
  sendNotFound,
  sendBadRequest,
  sendUnauthorized,
  sendForbiden,
  sendInternalError,
};
