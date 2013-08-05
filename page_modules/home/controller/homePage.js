var rek = require('rekuire');
var pageObject = rek('pageObject.js');
var stringUtil = rek('stringUtil.js');
var auth = rek('auth.js');
var fs = require('fs');

exports.page = function() {
    pageObject.page.call(this, 'home', 'Home');
    this.largeTitle = 'large title';
    this.slogan = 'your slogan';
    this.largeButton = 'home';
    this.bigLogo = '/public/assets/custom/img/star.png';

    this.blockHeading1='Service 1';
    this.blockHeading2='Service 2';
    this.blockHeading3='Store Info';

    this.block1='Service description';
    this.block2='Service description';
    this.block3='Phone: (123) 456-7890\n\nHours:\nMon-Fri: 9am-5pm\nWeekends: 11am-8pm\n';
};

exports.save = function(req, res, dbPage, callback) {
    dbPage.largeTitle=req.body.largeTitle;
    dbPage.slogan=req.body.slogan;

    dbPage.block1 = req.body.block1;
    dbPage.block2 = req.body.block2;
    dbPage.block3 = req.body.block3;

    dbPage.blockHeading1 = req.body.blockHeading1;
    dbPage.blockHeading2 = req.body.blockHeading2;
    dbPage.blockHeading3 = req.body.blockHeading3;

    pageObject.saveImg(req, req.files.bigLogo, dbPage, 'bigLogo', function(fileLocation, err){
        if(fileLocation!==''){
            dbPage.bigLogo=fileLocation;
        }
        callback(err);
    });
}

exports.prepareForHtml = function(dbPage) {
    dbPage.block1 = stringUtil.replaceNewlineWithBR(dbPage.block1);
    dbPage.block2 = stringUtil.replaceNewlineWithBR(dbPage.block2);
    dbPage.block3 = stringUtil.replaceNewlineWithBR(dbPage.block3);
}
