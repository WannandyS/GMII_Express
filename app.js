var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

//library
var flash   = require('express-flash');
var session = require('express-session');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/admin')
var registerRouter = require('./routes/register');
var usersRouter = require('./routes/users');
var retretRouter = require('./routes/retret');
var wartaRouter = require('./routes/warta');
var kegiatan_gerejaRouter = require('./routes/kegiatan_gereja'); // <-- route posts

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(session({ 
  cookie: { 
    maxAge: 60000 
  },
  store: new session.MemoryStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}))

app.use(flash())

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/admin', adminRouter);
app.use('/register', registerRouter);
app.use('/users', usersRouter);
app.use('/retret', retretRouter);
app.use('/warta', wartaRouter);
app.use('/kegiatan_gereja', kegiatan_gerejaRouter); // use route posts di Express

app.get('/GMII', function(req, res) {
  res.sendFile(path.join(__dirname, 'public/GMII/index.html'));
});

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