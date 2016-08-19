var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);


// error handlers
// Handle 404
app.use(function(err, req, res, next) {
  res.status(404);
  res.render('error', {
    message: "404 - File Not Found"
  });
});


//Handle 500
app.use(function(err, req, res, next) {
  res.status(500);
  res.render('error', {
    message: "500 - Server Error"
  });
});

module.exports = app;
