var mongoose = require('mongoose');
var fs = require('fs');

var rek = require('rekuire');
var cryptoUtil = rek('cryptoUtil.js');
var page = rek('pageObject.js');
var mainSite = rek('mainSite.js');
var auth = rek('auth.js');
var errHandler = rek('errorHandler.js');

var homePage = rek('homePage.js');
var styleInclude = rek('styleInclude.js');
//var contactPage = rek('contactPage.js');
var routingHelper = rek('routingHelper.js');


exports.changeStyle = function(req, res, next){
    errHandler.ensureOrRedirectWithErr(req, res, next, auth.isLoggedIn(req), '/', 'You must login to modify your pages.', function(){
        var accSchema = mongoose.model('Account');
        accSchema.get(auth.getEmail(req), function(err, acc){
            res.template.account = acc;


            switch(req.params[0])
            {
                case 'saveStyle':
                    var pageData = acc.getIncludePageByDisplayName('includes/style');
                    pageData.backgroundColor = req.body.background;
                    pageData.secondaryColor = req.body.secondaryColor;
                    pageData.font = req.body.font;
                    pageData.customStyle = req.body.customStyle;
                    acc.markModified('includePages');
                    acc.save(function(err){
                        page.generateAllPages(acc, function(){
                            //redirect to dashboard
                            res.redirect('/dashboard/changeStyle');
                        });
                    });
                    break;
                default:
                    res.redirect('/');
            }
        });
    });
}

exports.saveSiteName = function(req, res, next){
    errHandler.ensureOrRedirectWithErr(req, res, next, auth.isLoggedIn(req), '/', 'You must login to modify your pages.', function(){
        var accSchema = mongoose.model('Account');
        accSchema.get(auth.getEmail(req), function(err, acc){
            res.template.account = acc;


            switch(req.params[0])
            {
                case 'saveSiteName':
                    acc.global.siteName = req.body.siteName;
                    acc.markModified('global');
                    acc.save(function(err){
                        page.generateAllPages(acc, function(){
                            //redirect to dashboard
                            res.redirect('/dashboard/generalSiteSettings');
                        });
                    });
                    break;
                default:
                    res.redirect('/generalSiteSettings');
            }
        });
    });
}

exports.addRemovePages = function(req, res, next){
    errHandler.ensureOrRedirectWithErr(req, res, next, auth.isLoggedIn(req), '/', 'You must login to modify your pages.', function(){
        var accSchema = mongoose.model('Account');
        accSchema.get(auth.getEmail(req), function(err, acc){
            res.template.account = acc;


            switch(req.params[0])
            {
                case 'addPage':
                    errHandler.ensureOrRedirectWithErr(req, res, next, req.body.pageDisplayName!=='', '/dashboard/addRemovePages', 'Page name cannot be blank.', function(){
                        errHandler.ensureOrRedirectWithErr(req, res, next, acc.getPageByDisplayName(req.body.pageDisplayName)===false, '/dashboard/addRemovePages', 'A page with that display name already exists.', function(){
                            var pageController = page.getPageController(req.body.pageType);
                            errHandler.ensureOrRedirectWithErr(req, res, next, pageController!==false, '/dashboard/addRemovePages', 'Unable to create page of that type.', function(){
                                var newPage = new pageController.page();
                                newPage.displayName = req.body.pageDisplayName;
                                acc.pages.push(newPage);
                                acc.markModified('pages');
                                page.createPageFolders(auth.getEmail(req), newPage, function(){
                                    acc.save(function(err){
                                        page.generateAllPages(acc, function(){
                                            //redirect to dashboard
                                            res.redirect('/dashboard/addRemovePages');
                                        });
                                    });
                                });
                            });
                        });
                    });
                    break;
                case 'removePage':
                    errHandler.ensureOrRedirectWithErr(req, res, next, req.body.pageDisplayName!==acc.homePage, '/dashboard/addRemovePages', 'Cannot remove your current homepage. Please select a new homepage below and try deleting again.', function(){
                        acc.removePageByDisplayName(req.body.pageDisplayName, function(){
                            acc.save(function(err){
                                page.generateAllPages(acc, function(){
                                    res.redirect('/dashboard/addRemovePages');
                                });
                            });
                        });
                    });
                    break;
                case 'setHomePage':
                    acc.homePage=req.body.pageDisplayName;
                    acc.save(function(err){
                        page.generateAllPages(acc, function(){
                            res.redirect('/dashboard/addRemovePages');
                        });
                    });
                    break;
                default:
                    res.redirect('/dashboard/addRemovePages');
            }


        });
    });
}

exports.savePage = function(req, res, next){
    var pageDisplayNameToSave = req.params[0];
    errHandler.ensureOrRedirectWithErr(req, res, next, auth.isLoggedIn(req), '/', 'You must login to modify your pages.', function(){
        var accSchema = mongoose.model('Account');
        accSchema.get(auth.getEmail(req), function(err, acc){
            res.template.account = acc;
            for(var i=0;i<acc.pages.length;i++){
                if(acc.pages[i].displayName===pageDisplayNameToSave){
                    var pageController = page.getPageController(acc.pages[i].pageType);
                    pageController.save(req, res, acc.pages[i], function(redirect){
                        if(!redirect){
                            redirect='/dashboard';
                        }
                        acc.markModified('pages');
                        acc.save(function(err){
                            page.generateAllPages(acc, function(){
                                res.redirect(redirect);
                            });
                        });
                    }, acc);
                    break;
                }
            }
        });
    });
}

//TODO fix wrong error message
exports.login = function(req, res, next){
    auth.authenticate(req, function(err) {
        errHandler.ensureOrRedirectWithErr(req, res, next, !err, '/', err, function(){
            res.redirect('/dashboard');
        });
    });
}

exports.signUp = function(req, res, next){
    createAcc(req.body.email, req.body.password, function(err) {
        errHandler.ensureOrRedirectWithErr(req, res, next, !err, '/', err, function(){
            exports.login(req, res, next);
        });
    });
}

exports.logout = function(req, res, next){
    auth.clearAuth(req);
    res.redirect('/');
}


var createAcc = function(email, password, callback) {
    cryptoUtil.crypt(password, function(hashedPass){
        // Store hash in your password DB.
        var home = new homePage.page();
        var style = new styleInclude.page();
        //var contact = new contactPage.page();
        var accSchema = mongoose.model('Account');
        var newAcc = new accSchema({
            email: email,
            password: hashedPass,
            domain:'/user/'+email,
            homePage: home.displayName,
            //Default pages are made here remember to generate page folders below. TODO fix so u dont need to read this stupid comment.
            pages: new Array(home),
            includePages: new Array(style),
            global: new page.clientGlobal()
        });

        newAcc.save(function(err, newAcc) {
            if (err) {
                err = "Account already exists";
                callback(err);
            }else{
                //create folders then generate all pages
                fs.mkdir(process.cwd() + '/public/clientSites', function() {
                    fs.mkdir(process.cwd() + '/views/clientSites', function() {
                        fs.mkdir(process.cwd() + '/public/clientSites/' + email, function() {
                            fs.mkdir(process.cwd() + '/views/clientSites/' + email, function() {
                                fs.mkdir(process.cwd() + '/views/clientSites/' + email+'/includes', function() {
                                    page.createPageFolders(email, home, function(){
                                        page.generateAllPages(newAcc, function() {
                                            callback(null);
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            }
        });
    });
};
