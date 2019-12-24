const createError = require('http-errors');
const express = require('express');
const useMiddleware = require('./middleware');
const path = require('path')
const usersRouter = require('./routes/users');
const recipesRouter = require('./routes/recipes');
const parcesRouter = require('./routes/parses');
const uploaderRouter = require('./routes/uploads');

const app = express();

useMiddleware(app);

// Подключаем mongoose.
const mongoose = require('mongoose');

mongoose.connect(
  'mongodb+srv://test:test@cluster0-anezw.mongodb.net/green-recipe?retryWrites=true&w=majority',
  // 'mongodb://localhost:27017/GreenRecipeProject',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
app.use(express.static(path.join(__dirname, 'build')));


app.use('/api/users/', usersRouter);
app.use('/api/recipes/', recipesRouter);
app.use('/api/parses/', parcesRouter);
app.use('/api/uploads/', uploaderRouter);
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
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
  res.send(err);
});

module.exports = app;
