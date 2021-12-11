var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./controllers/index');
var usersRouter = require('./controllers/users');
const artistsController = require('./controllers/artists')

var app = express();

// global vars for various uses (db connection / passport config)
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
app.use('/api/artists', artistsController)

// mongodb connection w/mongoose
const mongoose = require('mongoose')

// if in dev mode, use our .env file for config vars
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

mongoose.connect(process.env.DATABASE_URL, {
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

// start server here rather than in bin/www
//const port = process.env.PORT || 3000
//app.listen(port, () => console.log(`Running on port ${port}`))

module.exports = app;
