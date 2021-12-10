var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
var artistsRouter = require('./controllers/artists');

var app = express();
//新加的1
//globals 里面加入了 passport config（github）那个，所以要放前面
const globals = require('./config/globals')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/artists',artistsRouter)

//新加的2
// mongodb connection w/mongoose
const mongoose = require('mongoose')

//这里如果是测试，是不是能连接上服务器
mongoose.connect(globals.db,{
  useNewUrlParser: true,
  useUnifiedTopology: true

}).then(
    (res) => {
      console.log('Connected to MongoDB')
    }
).catch(() => {
  console.log('Could not connect to MongoDB')
})



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
