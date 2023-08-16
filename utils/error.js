function sendNotFound(res) {
  res.status(404).send({ message: 'Ресурсс не найден' });
}

function sendBadRequest(res) {
  res.status(400).send({ message: 'Переданы некорректные данные' });
}

function sendInternalError(res, err) {
  res.status(500).send({ message: `Ошибка сервера ${err.name}` });
}

module.exports = {
  sendNotFound,
  sendBadRequest,
  sendInternalError,
};
