var rek = require('rekuire');
var pageObject = rek('pageObject.js');
var auth = rek('auth.js');
var fs = require('fs');

exports.page = function() {
    pageObject.page.call(this, 'home', 'Home');
    this.largeTitle = 'large title';
    this.slogan = 'your slogan';
    this.largeButton = 'home';
    this.bigLogo = '';

    this.blockHeading1='heading';
    this.blockHeading2='heading';
    this.blockHeading3='heading';

    this.block1='block text';
    this.block2='block text';
    this.block3='block text';
};

exports.save = function(req, dbPage, callback) {
    dbPage.largeTitle=req.body.largeTitle;
    dbPage.slogan=req.body.slogan;

    dbPage.block1 = req.body.block1;
    dbPage.block2 = req.body.block2;
    dbPage.block3 = req.body.block3;

    dbPage.blockHeading1 = req.body.blockHeading1;
    dbPage.blockHeading2 = req.body.blockHeading2;
    dbPage.blockHeading3 = req.body.blockHeading3;

    pageObject.saveImg(req, req.files.bigLogo, dbPage, 'bigLogo', function(fileLocation, err){
        dbPage.bigLogo=fileLocation;
        callback(err);
    });
}

