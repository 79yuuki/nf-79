/**
 * @fileOverview hoge service
 * @name index.js
 * @author Yuki Shichiku <yuuki.79@gmail.com>
 */

function HogeService() {}

module.exports = new HogeService();

HogeService.prototype.hogeHoge = function(callback) {
	return callback(null, "hoge");
};