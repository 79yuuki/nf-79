var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('../routes'),
    assert = require('assert'),
    config = require('./../config');


var partials = require('express-partials');

var app = express();
// load the express-partials middleware
app.use(partials());

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views',path.normalize(__dirname + '/../views'));
	app.set('view engine', 'ejs');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname + '/../', 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.use(express.static('public/common'));
app.use(express.static('public/'+config.ENV_NAME));

// Function : convert a date object.
var local = require('./../util_modules/local')(app);

// routing setup
routes.setup(app);


var serverInstance = null;

exports.serverActive = function(callback){
	serverInstance = http.createServer(app).listen(app.get('port'), function(err, result) {
		assert.ifError(err);
		callback(err, result);
	});
};

exports.serverDeactive = function(callback){
	callback(null);
	serverInstance.close(function(){});
};
