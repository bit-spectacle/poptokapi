var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var session = require('express-session');

var index = require('./routes/index');
var map = require('./routes/map');
var users = require('./routes/users');
var auth = require('./routes/auth');
var posting = require('./routes/posting');
var report = require('./routes/report');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
  cooke: {
    maxAge: 60 * 60 * 1000 //1hour
  }
}))


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/map', map);
app.use('/users', users);
app.use('/auth', auth);
app.use('/posting', posting);
app.use('/report', report);


app.get('/session', function(req,res){
  if(req.session.user_uid)
  {
    res.send('key : '+req.session.save);
    console.log('req.session.save : ' + req.session.save);
    console.log('sessionId : '+ req.sessoinID);
  }
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});




// app.get('/users/auth/:email/:password')

module.exports = app;
