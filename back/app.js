const createError = require('http-errors');
const express = require('express');
const useMiddleware = require('./middleware');

const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');

const app = express();

useMiddleware(app);

// Подключаем mongoose.
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/GreenRecipeProject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/api/users/', usersRouter);
app.use('/api/recipes/', recipesRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
