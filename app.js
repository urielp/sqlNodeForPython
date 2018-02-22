var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

//******SQLLITE SECTION******
var sqlLite = require('sqlite3').verbose();

let db = new sqlLite.Database('./db/tracking.db',(err) => {
  if(err) {
    return console.error(err.message);
  }
  console.log('Connected to the in memory SQLite DB');
});

for(let i =0;i<8;i++) {
//db.run('CREATE TABLE tempHum(temp REAL,hum REAL)');
    db.run('INSERT INTO tempHum(temp,hum)  VALUES(21.5,33)', ((err) => {
        if (err) {
            return console.error(err.message)
        }
        console.log(`row was inserted.${this.lastID}`)
    }));
}
db.close((err) => {
  if(err) {
    return console.error(err.message)
  }
  console.log('Close the data connection');
})
//****END OF SQL LITE*****

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
