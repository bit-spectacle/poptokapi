// import { MemoryStore } from './C:/Users/BIT/AppData/Local/Microsoft/TypeScript/2.6/node_modules/@types/express-session';

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var session = require('express-session');
var MemoryStore = require('memorystore')(session)
// var FileStore = require('session-file-store')(session);

var index = require('./routes/index');
var map = require('./routes/map');
var users = require('./routes/users');
var auth = require('./routes/auth');
var posting = require('./routes/posting');
var report = require('./routes/report');
var upload = require('./routes/upload');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cookieParser());

app.use(session({
  secret: 'key',
  resave: false,
  saveUninitialized: true,
  store: new MemoryStore({
    checkPeriod:86400000
  })

  // store: new FileStore({
  //   path: './sessions/'
  // })
}));


//uncomment after placing your favicon in /public
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
app.use('/upload', upload);


app.get('/session', function(req,res){
  if(req.session.user)
  {
    res.send('key : '+req.session.save);
    console.log('req.session.save : ' + req.session.save);
    console.log('session userNo : '+ req.session.user.userNo);
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

module.exports = app;