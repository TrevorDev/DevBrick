var _ = require('underscore');
var mongoose = require('mongoose');

var rek = require('rekuire');
var auth = rek('auth.js');
var renderPage = rek('renderPage.js');
var stringUtil = rek('stringUtil.js');

exports.editPage = function(req, res, next) {
    if(auth.isLoggedIn(req)){
        var accSchema = mongoose.model('Account');
        accSchema.get(auth.getEmail(req), function(err, acc){
            res.template.account = acc;
            res.template.displayName = '';
            res.template.loggedIn = auth.isLoggedIn(req);
            res.template.email = auth.getEmail(req);
            res.template.pageData = acc.getPageByDisplayName(req.params[1]);
            renderPage.renderEditPage(req, res, next, req.params[0] , res.template);
        });
    }else{
        req.params[0]='';
        res.template.error='You must login to use the dashboard.';
        exports.showMainPage(req, res, next);
    }
}

exports.dashboard = function(req, res, next) {
    if((typeof req.params[2] === 'undefined') || req.params[2]===''){
        req.params[0]=req.params[0]+'/accountStats'
    }

    if(auth.isLoggedIn(req)){
        var accSchema = mongoose.model('Account');
        accSchema.get(auth.getEmail(req), function(err, acc){
            res.template.account = acc;

            res.template.editPagesMenu = (acc.pages.map(function(page){
                return '<li><a href="/editPage/'+page.pageType+'/'+page.displayName+'">'+page.displayName+'</a></li>';
            }).join(''));

            exports.showMainPage(req, res, next);
        });
    }else{
        req.params[0]='';
        res.template.error='You must login to use the dashboard.';
        exports.showMainPage(req, res, next);
    }
};

exports.showMainPage = function(req, res, next) {
	view = stringUtil.removeTrailingSlash(req.params[0]);

	var splitPath = view.split('/');
	if (splitPath[0] === 'dashboard') {
		if (splitPath.length === 1) {
			splitPath[1] = 'account';
		}
	}

    res.template.page = view;
    res.template.loggedIn = auth.isLoggedIn(req);
    res.template.email = auth.getEmail(req);
    renderPage.render(req, res, next, 'mainSite/' + view, res.template);
};