var Browser = require("zombie");
var assert = require("assert");

exports.testHomePage = function(){
	console.log('run');
browser = new Browser()
browser.visit("http://localhost", function () {
	assert.ok(browser.success);
	assert.equal(browser.text('h1'),'Creating a website just got simple.');
});
}

