const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true
//  useCreateIndex: true,
//  useFindAndModify: false
});

app.use((req, res, next) => {
  req.user = {
    _id: '64db84b14173dc2565dc9be6'
  };

  next();
});

app.use(bodyParser.json());
app.use(userRouter);
app.use(cardRouter);

app.listen(3000, () => {
  console.log("Server started");
});