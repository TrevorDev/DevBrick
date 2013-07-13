var fs = require('fs');
var ejs = require('ejs');
var rek = require('rekuire');
var pageObject = rek('pageObject.js');
var footerInclude = rek('footerInclude.js');
var headerInclude = rek('headerInclude.js');
var menuInclude = rek('menuInclude.js');
var auth = rek('auth.js');

exports.clientGlobal = function() {
	this.siteName = 'siteName';
};

exports.page = function(type, name, icon) {
	this.pageType = type;
	this.displayName = name;
    this.pageIcon = icon;
};

exports.generatePage = function(pageToGen, accEmail, callback) {
	fs.readFile(process.cwd() + '/page_modules/'+pageToGen.pageType+'/views/page.ejs', function(err, data) {
		var pageString = data.toString('utf8');
		pageToGen.filename = process.cwd() + '/views/clientSites/' + accEmail + '/' + pageToGen.displayName + '.ejs';
		compileAndWriteEJS(pageString,pageToGen, function() {
			callback(err);
		});
	});
};

var compileAndWriteEJS = function(pageString, pageToGen, callback) {
	var newFile = ejs.render(pageString, pageToGen);
	fs.writeFile(pageToGen.filename, newFile, function(err) {
		callback(err);
	});
};

exports.generateAllPages = function(acc, callback) {
	var numRunning = 0;
	var genCallBack = function() {
		numRunning--;
		if (numRunning === 0) {
			callback();
		}
	};

	var menu = new menuInclude.page(acc);
	var bottom = new footerInclude.page();
	var header = new headerInclude.page();

	pageObject.generatePage(menu, acc.email, function() {
		pageObject.generatePage(bottom, acc.email, function() {
			pageObject.generatePage(header, acc.email, function() {
				for (var i = 0; i < acc.pages.length; i++) {
					numRunning++;
					pageObject.generatePage(acc.pages[i], acc.email, genCallBack);
				}
			});
		});
	});
};

exports.saveImg = function(req, img, dbPage, name, callback){
    if(img){
        fs.readFile(img.path, function (err, data) {
            var appPath = "/public/clientSites/"+auth.getEmail(req)+"/"+dbPage.displayName+"_"+name+"_"+img.name
            var sysPath = process.cwd() + appPath;
            fs.writeFile(sysPath, data, function (err) {
                callback(appPath, err);
            });
        });
    }else{
        callback('');
    }
};