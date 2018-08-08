if (process.env.NODE_ENV !== 'production') {
    require('dotenv').load();
}
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var mrRouter    = require('./routes/mrlist');
var mrQuery     = require('./routes/mrquery');
var mrNo        = require('./routes/mrno');
var mrData      = require('./routes/mrdata');
var dateRouter  = require('./routes/date_index');
var dateAjax  = require('./routes/date_ajax');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/mrlist', mrRouter);
app.use('/mrquery', mrQuery);
app.use('/mr', mrNo);
app.use('/mrdata', mrData);
app.use('/date',dateRouter);
app.use('/datelist',dateAjax);


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
  res.render('error');
});

module.exports = app;
