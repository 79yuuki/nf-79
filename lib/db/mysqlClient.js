var config = require('../../config');
var Client = require('mysql');

//MySQLデータベースに接続しcallbackを呼び出す
function mysql(callback) {

	var client = Client.createConnection({
		host: config.mysql.HOST,
		port: config.mysql.PORT,
		user: config.mysql.USER,
		password: config.mysql.PASSWD,
		database: config.mysql.NAME
	});
	callback(client);
}

module.exports = mysql;
