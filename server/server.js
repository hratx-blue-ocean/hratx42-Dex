const createError = require('http-errors');
const logger = require('morgan');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')

const port = process.env.PORT || 3000;

const usersRoute  = require('./routes/users');
const tablesRoute = require('./routes/tables');

// open up CORS 
app.use((_, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(logger('dev'));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client/public')));


app.use('/api/users', usersRoute)
app.use('/api/tables', tablesRoute)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

module.exports = app;