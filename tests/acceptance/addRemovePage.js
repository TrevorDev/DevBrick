var Browser = require("zombie");
var assert = require("assert");
var rek = require('rekuire');
var loginHelper = rek("loginToDash.js");

exports.runTest = function(callback){
	browser = new Browser();

	loginHelper.login(browser, function(){
		browser.clickLink("Add or Remove Pages", function() {
			assert.equal(browser.location.pathname, "/dashboard/addRemovePages");
			callback();
		});
	});
}