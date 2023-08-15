function sendNotFound(res) {
  res.status(404).send({message: 'Ресурсс не найден'});
}

function sendBadRequest(res, err) {
  res.status(400).send({message: err.name});
}

function sendInternalError(res, err) {
  res.status(500).send({error: err});
}

module.exports = {
  sendNotFound,
  sendBadRequest,
  sendInternalError,
}