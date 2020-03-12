// 加载依赖库，原来这个类库都封装在connect中，现在需地注单独加载
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//缓存模块
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
//压缩模块
var compression = require('compression');
//安全模块
var lusca = require('lusca');
// 创建项目实例
var app = express();

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// 定义icon图标
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// 定义日志和输出级别
app.use(logger('dev'));
// 定义数据解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// 定义cookie解析器
app.use(cookieParser());
//定义压缩方式
app.use(compression());
// 定义静态文件目录
app.use(express.static(path.join(__dirname, 'public')));

// 加载路由控制
var routes = require('./routes');
var users = require('./routes/users');

//路由中间件
var enrouten = require('express-enrouten');
app.use(enrouten({
  directory: 'controllers'
}));

// 匹配路径和路由
app.get('/', routes.index);
app.get('/users', users.list);

//缓存配置
app.use(session({
  name: 'session',
  secret: 'GeminiSession', // 建议使用 128 个字符的随机字符串
  resave: false,
  saveUninitialized: true,
  httpOnly: true,
  store: new RedisStore({
    host:'127.0.0.1',
    port: 6379,
    ttl: 60 * 60 * 24 * 30,   //Session的有效期为30天
    //此属性可选。redis可以进行分库操作。若无此参数，则不进行分库
    //db:'mydb'
  }),
  cookie: { maxAge: 60000 * 1000,secure: false },
  key: 'Gemini'
}));

//安全配置
app.use(lusca({
  csrf: false,
  csp: {},
  xframe: 'SAMEORIGIN',
  p3p: 'CP=CAO PSA OUR',
  hsts: {maxAge: 31536000, includeSubDomains: true, preload: true},
  xssProtection: true,
  nosniff:true
}));

// 404错误处理
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// 开发环境，500错误处理和错误堆栈跟踪
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// 生产环境，500错误处理
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

// 输出模型app
module.exports = app;
