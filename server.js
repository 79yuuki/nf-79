var express = require('express'),
    expressValidator = require('express-validator'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes'),
    local = require('./lib/util/local'),
    config = require('./config');

// サーバのアドレスとポート
var partials = require('express-partials');
var accessLogger = require('./lib/util/logger').accessLogger;

var app = express();

config.setup();

// load the express-partials middleware
app.use(partials());

app.configure(function(){
  app.set('port', process.env.PORT || config.PORT);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
//  app.use(express.logger('dev'));
  app.use(expressValidator);
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(accessLogger);
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.static('public/common'));
  app.use(express.static('public/'+config.ENV_NAME));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


// Function : convert a date object.
local(app);

// routing setup
routes.setup(app);

// catchされなかった例外の処理設定。
process.on('uncaughtException', function (err) {
  console.log('uncaughtException : ' + err);
	return;
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
