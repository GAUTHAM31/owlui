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
var owlRouter = require('./routes/owl');
var pupilRouter = require('./routes/pupil');
var mrRouter    = require('./routes/mrlist');
var mrQuery     = require('./routes/mrquery');
var mrPupil     = require('./routes/mrquery-pupil');
var mrNo        = require('./routes/mrno');
var mrData      = require('./routes/mrdata');
var dateRouter  = require('./routes/date_index');
var dateAjax    = require('./routes/date_ajax');
var dateMrAjax  = require('./routes/date_mr_ajax');
var dateImage   = require('./routes/date_image_ajax');
var viewRouter  = require('./routes/view_ajax');
var folderAjax  = require('./routes/folder_ajax');
var download    = require('./routes/download');
var folderPupil  = require('./routes/folder_ajax_pupil');


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
app.use('/owl', owlRouter);
app.use('/pupil', pupilRouter);
app.use('/mrlist', mrRouter);
app.use('/mrquery', mrQuery);
app.use('/mrquery_pupil', mrPupil);
app.use('/mr', mrNo);
app.use('/mrdata', mrData);
app.use('/date',dateRouter);
app.use('/datelist',dateAjax);
app.use('/datemrlist',dateMrAjax);
app.use('/date_image',dateImage);
app.use('/folder_ajax',folderAjax);
app.use('/folder_ajax_pupil',folderPupil);
app.use('/download',download)
app.use('/view',viewRouter);


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
