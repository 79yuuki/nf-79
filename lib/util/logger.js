/**
 * @fileOverview logger module
 * @name logger.js
 * @author Yuki Shichiku <yuuki.79@gmail.com>
 */

var fs = require('fs');
var log4js = require('log4js');
var config = require('../../config');

var logDir = 'logs';
var logFile = logDir + "/system.log";
var accessFile = logDir + '/access.log';

if(!fs.existsSync(logDir)){
  fs.mkdirSync(logDir, 0755);
}

var logConfig;

if(config.debug){
// console
  logConfig = {
    'appenders': [
      { type: 'console' }
    ],
    'replaceConsole': true
  };
} else {
// log file
  logConfig = {
    'appenders': [
      { type: 'dateFile',
        filename: logFile,
        pattern: '-yyyy-MM-dd',
        category:'default'
      },
      { type: 'dateFile',
        filename: accessFile,
        pattern: '-yyyy-MM-dd',
        category:'access'
      }
    ]
  };
}

log4js.configure(logConfig);

function Logger() {}

Logger.prototype.getAccessLogger = function () {
  var logger = log4js.getLogger('access');
  return log4js.connectLogger(logger, {
    'level': log4js.levels.DEBUG,
    'nolog': [ '\\css', '\\.js', '\\.gif' ],
    'format': ':remote-addr - - ":method :url HTTP/:http-version" :status :content-length ":referrer" ":user-agent"'
  });
};

Logger.prototype.getLogger = function () {
  var logger = log4js.getLogger('default');
  logger.setLevel(log4js.levels.DEBUG);
  return logger;
};

var _logger = new Logger();

exports.accessLogger = _logger.getAccessLogger();
exports.logger = _logger.getLogger();