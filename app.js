var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('./db');
require('dotenv').config();

let BASE_URL =  '/api/v1';
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var productRouter = require('./routes/products');
var tesRuote = require('./routes/test');
var approvedRouter = require('./routes/approve');
var orderRouter = require('./routes/orders');

//create mongoose connection
const mongoose = require('mongoose');
const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS } = process.env;
var app = express();
var cors = require('cors');

app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(`${BASE_URL}`, indexRouter);
app.use(`${BASE_URL}/users`, usersRouter);
app.use(`${BASE_URL}/login`, loginRouter);
app.use(`${BASE_URL}/register`, registerRouter);
app.use(`${BASE_URL}/products`, productRouter);
app.use(`${BASE_URL}/login`, loginRouter);
app.use(`${BASE_URL}/test`, tesRuote);
app.use(`${BASE_URL}/approve`, approvedRouter);
app.use(`${BASE_URL}/orders`, orderRouter);



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
