var mongoose = require('mongoose');
var fs = require('fs');

var rek = require('rekuire');
var cryptoUtil = rek('cryptoUtil.js');
var page = rek('pageObject.js');
var mainSite = rek('mainSite.js');
var auth = rek('auth.js');
var errHandler = rek('errorHandler.js');

var homePage = rek('homePage.js');
var contactPage = rek('contactPage.js');
var routingHelper = rek('routingHelper.js');

exports.addRemovePages = function(req, res, next){
    errHandler.ensureOrRedirectWithErr(req, res, next, auth.isLoggedIn(req), '/', 'You must login to modify your pages.', function(){
        var accSchema = mongoose.model('Account');
        accSchema.get(auth.getEmail(req), function(err, acc){
            res.template.account = acc;


            switch(req.params[0])
            {
                case 'addPage':
                    //TODO error handle
                    var pageController = rek(req.body.pageType+'Page.js');
                    var newPage = new pageController.page();
                    newPage.displayName = req.body.pageDisplayName;
                    acc.pages.push(newPage);
                    acc.markModified('pages');
                    acc.save(function(err){
                        page.generateAllPages(acc, function(){
                            //redirect to dashboard
                            req.params[0]='dashboard';
                            req.params[2]='';
                            mainSite.dashboard(req, res, next);
                        });
                    });
                    break;
                case 'removePage':
                    acc.removePageByDisplayName(req.body.pageDisplayName);
                    acc.save(function(err){
                        page.generateAllPages(acc, function(){
                            //redirect to dashboard
                            req.params[0]='dashboard';
                            req.params[2]='';
                            mainSite.dashboard(req, res, next);
                        });
                    });
                    break;
                case 'setHomePage':
                    acc.homePage=req.body.pageDisplayName;
                    acc.save(function(err){
                        page.generateAllPages(acc, function(){
                            //redirect to dashboard
                            req.params[0]='dashboard';
                            req.params[2]='';
                            mainSite.dashboard(req, res, next);
                        });
                    });
                    break;
                default:
                    //redirect to dashboard
                    req.params[0]='dashboard';
                    req.params[2]='';
                    mainSite.dashboard(req, res, next);
            }


        });
    });
}

exports.savePage = function(req, res, next){
    console.log(req.params);
    var pageDisplayNameToSave = req.params[0];
    errHandler.ensureOrRedirectWithErr(req, res, next, auth.isLoggedIn(req), '/', 'You must login to modify your pages.', function(){
        var accSchema = mongoose.model('Account');
        accSchema.get(auth.getEmail(req), function(err, acc){
            res.template.account = acc;
            for(var i=0;i<acc.pages.length;i++){
                if(acc.pages[i].displayName===pageDisplayNameToSave){
                    var pageController = rek(acc.pages[i].pageType+'Page.js');
                    pageController.save(req, acc.pages[i], function(){
                        acc.markModified('pages');
                        acc.save(function(err){
                            page.generateAllPages(acc, function(){
                                //redirect to dashboard
                                req.params[0]='dashboard';
                                req.params[2]='';
                                mainSite.dashboard(req, res, next);
                            });
                        });
                    });
                    break;
                }
            }
        });
    });
}

exports.login = function(req, res, next){
    auth.authenticate(req, function(err) {
        if(err){
            res.template.error=err;
            req.param[1]='';
            mainSite.showMainPage(req, res, next);
        }else{
            res.redirect('/dashboard');
        }
    });
}

exports.signUp = function(req, res, next){
    createAcc(req.body.email, req.body.password, function(err) {
        if(err){
            res.template.error=err;
            req.param[1]='';
            mainSite.showMainPage(req, res, next);
        }else{
            exports.login(req, res, next);
        }
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
        var contact = new contactPage.page();
        var accSchema = mongoose.model('Account');
        var newAcc = new accSchema({
            email: email,
            password: hashedPass,
            domain:'/user/'+email,
            homePage: home.displayName,
            pages: new Array(home, contact),
            global: new page.clientGlobal()
        });

        newAcc.save(function(err, newAcc) {
            if (err) {
                err = "Account already exists";
                callback(err);
            }else{
                //create folders then generate all pages
                fs.mkdir(process.cwd() + '/public/clientSites/' + email, function() {
                    fs.mkdir(process.cwd() + '/views/clientSites/' + email, function() {
                        fs.mkdir(process.cwd() + '/views/clientSites/' + email+'/includes', function() {
                            page.generateAllPages(newAcc, function() {
                                callback(null);
                            });
                        });
                    });
                });
            }
        });
    });
};