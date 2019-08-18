require('dotenv').config();
const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const jwtChecker = require('./middleware/jwtChecker');

const port = process.env.PORT || 3000;

const usersRoute = require('./routes/users');
const tablesRoute = require('./routes/tables');
const decksRoute = require('./routes/decks');
const cardsRoute = require('./routes/cards');
const authRoute = require('./routes/auth');
const inviteRoute = require('./routes/invites');
const cookieParser = require('cookie-parser');
// open up CORS
app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));

// routes
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use('/api/invite', inviteRoute);
app.use(jwtChecker.checkToken);
app.use('/api/tables', tablesRoute);
app.use('/api/decks', decksRoute);
app.use('/api/cards', cardsRoute);

app.use('/*', express.static(path.join(__dirname, '../client/public')));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json('error');
});

module.exports = app;