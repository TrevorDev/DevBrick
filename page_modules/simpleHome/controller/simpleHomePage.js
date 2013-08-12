var rek = require('rekuire');
var pageObject = rek('pageObject.js');
var stringUtil = rek('stringUtil.js');
var auth = rek('auth.js');
var fs = require('fs');

exports.page = function() {
    pageObject.page.call(this, 'simpleHome', 'simpleHome');
    this.largeTitle = 'Simple Home Page';
    this.miniTitle = 'hope you like it';
    this.logo='';
};

exports.save = function(req, res, dbPage, callback) {
    dbPage.largeTitle=req.body.largeTitle;
    dbPage.miniTitle=req.body.miniTitle;

    pageObject.saveImg(req, req.files.logo, dbPage, 'logoPic'+(new Date()).toISOString().replace('.','-'), function(picFileLocation, err){
    	console.log(picFileLocation);
    	if(picFileLocation!==''){
            dbPage.logo=picFileLocation;
        }
        callback(err);
    });
}