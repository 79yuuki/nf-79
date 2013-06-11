"use strict";

// $ ./node_modules/.bin/mocha test/routes/home/index.js -r expect.js -R spec --timeout 8000

var request = require('request'),
	expect = require('expect.js');

var serverManagement = require('../../serverManagement');

describe(__dirname, function(){
	before(function(callback){
		serverManagement.serverActive(callback);
	});

	after(function(callback){
		serverManagement.serverDeactive(callback);
	});

	describe('routes accessed', function(){

		it('should return HTTP 200', function(done){
			request.get('http://localhost:3000/', function(err, response){
				expect(err).to.be(null);
				expect(response).to.be.a('object');
				expect(response.statusCode).to.be(200);
				done();
			});
		});
	});
});