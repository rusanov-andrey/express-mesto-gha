const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const { celebrate, Joi, errors } = require('celebrate');

const auth = require('./middlewares/auth');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/users');
const v = require('./validators/validators').validator;
const {
  MestoError,
  BadRequestError,
  ConflictError,
  CommonError,
  NotFoundError,
} = require('./utils/error');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb', {
  useNewUrlParser: true,
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: v.user.email,
    password: v.user.password,
  }),
}), login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: v.user.email,
    password: v.user.password,
    name: v.user.name,
    about: v.user.about,
    avatar: v.user.avatar,
  }).unknown(true),
}), createUser);

app.use(auth);
app.use(userRouter);
app.use(cardRouter);
app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use(errors());

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  console.log('err_111');
  console.log(err);
  let finalError = new CommonError(err.name);
  if (err instanceof MestoError) {
    finalError = err;
  } else if ((err.name === 'ValidationError') || (err.name === 'CastError')) {
    finalError = new BadRequestError();
  } else if (err.code === 11000) {
    finalError = new ConflictError();
  }

  return res.status(finalError.code).send({ message: finalError.message });
});

app.listen(3000, () => {
  console.log('Server started');
});
