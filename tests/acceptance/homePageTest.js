var Browser = require("zombie");
var assert = require("assert");

exports.runTest = function(callback){
	browser = new Browser();
	browser.visit("http://127.0.0.1/", function () {
		assert.ok(browser.success);
		assert.equal(browser.text('h1'),'Creating a website just got simple.');
		callback();
	});
}

