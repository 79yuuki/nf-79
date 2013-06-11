/**
 * @fileOverview URL base routing.
 * @name index.js
 * @author Yuki Shichiku <yuuki.79@gmail.com>
 */

var _ = require('underscore');
var config = require('../config');

var Routing = function (){};

module.exports = new Routing();

Routing.prototype.setup = function (express) {
	console.log('setup routes');
	for(var name in config.handlers) {
		var route = require('../routes/' + name);

		var methods = _.keys(route.__proto__);
		for(var i=0; i < methods.length; i++){
			var method = methods[i];
			express[method](config.handlers[name].url, route[method]);
			console.log('Add URL-base Routing [', method.toUpperCase(), config.handlers[name].url, name, ']');
		}
	}
};
