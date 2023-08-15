function sendNotFound(res) {
  res.status(404).send({error: 'Ресурсс не найден'});
}

function sendBadRequest(res, err) {
  res.status(400).send({error: err});
}

function sendInternalError(res, err) {
  res.status(500).send({error: err});
}

module.exports = {
  sendNotFound,
  sendBadRequest,
  sendInternalError,
}