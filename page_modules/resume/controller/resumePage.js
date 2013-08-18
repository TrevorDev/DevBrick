var rek = require('rekuire');
var pageObject = rek('pageObject.js');
var stringUtil = rek('stringUtil.js');
var auth = rek('auth.js');
var fs = require('fs');

exports.page = function() {
    pageObject.page.call(this, 'resume', 'Resume');
    this.pdfFile='';
};

exports.save = function(req, res, dbPage, callback, acc) {
    if(!req.files){
        req.files = {};
    }
    var date = new Date();
    pageObject.saveFile(req, req.files.resumePDF, dbPage, 'resumePDF'+date.toISOString().replace('.','-'), function(fileLocation, err){
        auth.getToken(function(token){
            dbPage.pdfFile = fileLocation;
            callback("/editPage/"+dbPage.pageType+"/"+dbPage.displayName);
        });
    });
}