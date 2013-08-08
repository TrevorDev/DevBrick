var rek = require('rekuire');
var pageObject = rek('pageObject.js');
var stringUtil = rek('stringUtil.js');
var auth = rek('auth.js');
var fs = require('fs');

exports.page = function() {
    pageObject.page.call(this, 'customHtml', 'customHtml');
    this.html = '<p>Hello world</p>';
    
};

exports.save = function(req, res, dbPage, callback) {
    dbPage.html=req.body.html;
    dbPage.slogan=req.body.slogan;
    callback();
}
