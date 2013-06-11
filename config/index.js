/**
 * @fileOverview setting modules
 * @author Yuki Shichiku <shichiku_yuki@cyberagent.co.jp>
 */

var fs = require('fs');
var commander = require('commander');

var _initCommander = function() {
	commander
	.version('0.0.2')
	.description('Start the service of the magic admin')
	.option('-c --config <path>', 'path of setting file')
	.option('-d --debug', 'debug mode')
	.parse(process.argv);

	if(!commander.config) {
		commander.config = 'config/local/config.json';
	}

	if(commander.debug) {
		commander.debug = true;
	} else {
		commander.debug = false;
	}

	return commander;
};

var redefineProperty = function(name, value) {
	Object.defineProperty(exports, name, {
		enumerable: true,
		configurable: false,
		value: value
	});
};

var Config = function(){

// redefinePropertyを使ってconfigurable: falseを上書き設定することで、exports.configを２度ロードしない(getterを使わない)ようにしている。
	Object.defineProperty(exports, 'config', {
		enumerable: true,
		configurable: true,
		get: function() {
			return redefineProperty('config', (function(){
				var self = this;
				self.setup();
				return self;
			})());
		}
	});

};

Config.prototype.setup = function() {
	try {
		var thisCommander = _initCommander();

		var conf = JSON.parse(fs.readFileSync(thisCommander.config));
		for(var key in conf) {
			this[key] = conf[key];
		}
		// setting debug mode
		this['debug'] = thisCommander.debug;

		console.info('Configure the server mode[', thisCommander.config, ']');
	} catch(e) {
		console.error(e.stack);
		process.exit(1);
	}
};

module.exports = new Config();
