var _ = require('underscore');
var mongoose = require('mongoose');

var rek = require('rekuire');
var auth = rek('auth.js');
var renderPage = rek('renderPage.js');
var stringUtil = rek('stringUtil.js');
var pageHelper = rek('pageObject.js');
var errHandler = rek('errorHandler.js');
var editHtmlHelper = rek('editHtmlHelper.js');

exports.editPage = function(req, res, next) {
    errHandler.ensureOrRedirectWithErr(req, res, next, auth.isLoggedIn(req), '/', 'You must login to use the dashboard.', function(){
        var accSchema = mongoose.model('Account');
        accSchema.get(auth.getEmail(req), function(err, acc){
            
            res.template.libs = {};
            res.template.libs.editHtmlHelper=editHtmlHelper;

            res.template.sessionData = auth.getSessionData(req);

            res.template.pageData = acc.getPageByDisplayName(req.params[1]);
            
            renderPage.renderEditPage(req, res, next, req.params[0]);
        });
    });
}

exports.dashboard = function(req, res, next) {
    if((typeof req.params[2] === 'undefined') || req.params[2]===''){
        req.params[0]=req.params[0]+'/accountStats'
    }
    errHandler.ensureOrRedirectWithErr(req, res, next, auth.isLoggedIn(req), '/', 'You must login to use the dashboard.', function(){
        var accSchema = mongoose.model('Account');
        accSchema.get(auth.getEmail(req), function(err, acc){
            res.template.accountData=acc.getAccountData();

            res.template.pageData = {};
            res.template.pageData.editPagesMenu = (acc.pages.map(function(page){
                return '<li><a href="/editPage/'+page.pageType+'/'+page.displayName+'">'+page.displayName+'</a></li>';
            }).join(''));
            if(req.params[2]=='addRemovePages'){
                res.template.pageData.pageTypes = pageHelper.getPageTypes('<option>','</option>').join('');
                res.template.pageData.allPageDisplayNames = acc.getAllPageDisplayNames('<option>','</option>').join('');
            }

            exports.showMainPage(req, res, next);
        });
    });
};

exports.default = function(req, res, next) {
    exports.showMainPage(req, res, next);
}

exports.showMainPage = function(req, res, next) {
	view = stringUtil.removeTrailingSlash(req.params[0]);

    if (view === '') {
        view = 'home';
    }

    res.template.error = errHandler.getAndClearReqErr(req);

    res.template.displayData={};
    res.template.displayData.view = view;

    res.template.sessionData = auth.getSessionData(req);
    renderPage.render(req, res, next, 'mainSite/' + view);
};
