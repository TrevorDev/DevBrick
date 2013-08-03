var Browser = require("zombie");
var assert = require("assert");

exports.runTest = function(callback){
	browser = new Browser();
	exports.login(browser, function(){
		callback();
	});
}

exports.login = function(browser, callback){
	browser.visit("http://127.0.0.1/", function () {
		assert.ok(browser.success);
		browser.
		fill("email", "test@test.com").
		fill("password", "testmonkey").
		pressButton("Log In", function() {
			assert.ok(browser.success);
			assert.equal(browser.location.pathname, "/dashboard");
			callback();
		});
	});
}