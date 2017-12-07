var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var login = require('./routes/login');
var users = require('./routes/users');

var app = express();
var router = express.Router();
// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('.html', require('ejs').__express);  
app.set('view engine', 'html'); 

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

router.post('/login', function (req,res,next){   
  var username = req.body.username;
  var pwd = req.body.pwd;
  var rememberMe = req.body.rememberMe
  var user={  
    username:'admin',  
    pwd:123  
  }  
  if(username==user.username && pwd==user.pwd){
    //设置cookie
    if (rememberMe) {
      res.cookie("user", {username: username}, {maxAge: 600000 , httpOnly: false});
    } else {
      res.cookie("user", {username: username}, { httpOnly: false});
      
    }
    res.redirect('users'); 
  }else{
    req.error = '用户名密码错误'
    res.render('login' , req) ;
  }  
   
})

app.use('/login', login);

router.get('/users', function(req, res, next) {  
  if(req.cookies.user !== null){
    req.user=req.cookies.user;
  }
  res.render('users', req);
});

router.get('/logout', function (req,res,next){ 
  //删除Cookie  
  res.clearCookie('user');
  res.redirect('users'); 
})

app.use(router)

module.exports = app;
