/**
 * @fileOverview home(top page) controller
 * @name index.js
 * @author Yuki Shichiku <yuuki.79@gmail.com>
 */
var config = require('../../config');

// Constructor
var Home = function() {

};
var locals = {
	error: null,
	results: null
};

module.exports = new Home();

/**
 * get index page.
 * @param {Request} req
 * @param {Response} res
 */
Home.prototype.get = function(req, res) {
	locals.results = config.NAME;
	return res.render('index', {locals: locals});
};
