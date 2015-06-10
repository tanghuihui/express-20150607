var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment=require('moment');
var router = express.Router();
var fs=require('fs');
var NodeSession = require('node-session');
var nodeSession = new NodeSession({secret: 'Q3UBzdH9GEfiRCTKbi5MTPyChpzXLsTD'});
var app = express();
function session(req, res, next){
  nodeSession.startSession(req, res, next);
}


//实现功能 验证用户是否登录，没有登录则跳转到登录页面。
function islogin(req,res,next){
  if(!req.session.has("username")) {
    if (req.originalUrl != '/') {
      if (req.originalUrl == '/success' && req.method == 'POST') {
       // next();
      }else{
        return res.redirect('/');
      }

    }

  }
  console.log(req.session.get('username'));
  next();


}

//记录用户每次访问的页面url，访问时间，用户名。 记录到 log.txt中。
function login_log(req,res,next){

var session_log={
  status:!req.session.has("username")? 0:1,
  url:req.url,
  date:moment().format('MMMM Do YYYY, h:mm:ss a'),
  username:req.session.get('username')
}
fs.open('./log.txt','a',0644,function(e,fd){
  if(e) throw e;
var value="\n\r------------------\n\r "
    +"\n\r status:"+session_log.status+"\n\r "
    +"\n\r url:"+session_log.url+"\n\r "
    +"\n\r date:"+session_log.date+"\n\r "
    +"\n\r username:"+session_log.username+"\n\r------------------\n\r";

  fs.write(fd,value,function(e){
    if(e) throw e;
    fs.closeSync(fd);
  })

  });

  next();

}
var routes = require('./routes/index');
var users = require('./routes/users');
var success=require('./routes/success');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hjs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));


app.use(session);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(express.static(path.join(__dirname, 'public')));
app.use(islogin);
app.use(login_log);
app.use('/', routes);
app.use('/users', users);
app.use('/success', success);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
