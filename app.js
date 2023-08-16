const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { sendNotFound } = require('./utils/error');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

app.use((req, res, next) => {
  req.user = {
    _id: '64db84b14173dc2565dc9be6',
  };

  next();
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());
app.use(userRouter);
app.use(cardRouter);
app.use((req, res) => {
  sendNotFound(res);
});

app.listen(3000, () => {
  console.log('Server started');
});
