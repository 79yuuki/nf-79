/**
 * @fileOverview hogefuga controller
 * @name fuga.js
 * @author Yuki Shichiku <yuuki.79@gmail.com>
 */

var hogeService = require('../../service/hoge');
var logger = require('../../lib/util/logger').logger;

// Constructor
var Hoge = function(){

};

var locals = {
	error: null,
	results: null
};

module.exports = new Hoge();

/**
 * get hoge page.
 * @param {Request} req
 * @param {Response} res
 */
Hoge.prototype.get = function(req, res) {
	locals.results = 'hello';
	return res.render('hoge/fuga', {locals: locals});
};

/**
 * post hoge page.
 * @param {Request} req
 * @param {Response} res
 */
Hoge.prototype.post = function(req, res) {

	hogeService.hogeHoge(function(err, results) {
		if(err){
			logger.error(err);
			locals.error(err);
			return res.render('error', {locals: locals});
		}
		locals.results = results;
		return res.render('hoge/fuga', {locals: locals});
	});
};