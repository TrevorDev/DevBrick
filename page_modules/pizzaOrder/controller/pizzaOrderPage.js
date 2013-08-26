var rek = require('rekuire');
var pageObject = rek('pageObject.js');
var stringUtil = rek('stringUtil.js');
var auth = rek('auth.js');
var fs = require('fs');

exports.page = function() {
    pageObject.page.call(this, 'pizzaOrder', 'pizzaOrder');
};

exports.save = function(req, res, dbPage, callback) {
    callback();
}