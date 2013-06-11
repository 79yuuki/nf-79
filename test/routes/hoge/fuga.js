"use strict";
var request = require('request'),
    expect = require('expect.js'),
    path = require('path');
var serverManagement = require('../../serverManagement');
var base_url = 'http://localhost:3000/' ;
var target   = path.basename(path.dirname(__filename)) + '/' +  path.basename(__filename).replace( /.js$/, "" ) ;

describe(path.basename(path.dirname(__filename)) + '/' + path.basename(__filename),function() {
	before(function(callback){
		serverManagement.serverActive(callback);
	});
	after(function(callback){
		serverManagement.serverDeactive(callback);
	});
	describe(target, function(){
		it('should return HTTP 200', function(done){
			request.get(base_url + target, function(err, response){
				expect(err).to.be(null);
				expect(response).to.be.a('object');
				expect(response.statusCode).to.be(200);
				expect(response.request.path).to.eql('/' + target);
				done();
			});
		});
	});
});
