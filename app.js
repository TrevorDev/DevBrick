//NODE JS modules
var express = require('express');
var ejs = require('ejs');
var app = express();
var mongoose = require('mongoose');
GLOBAL.GAPP = app;
//CUSTOM modules
var rek = require('rekuire');
var errLog = rek('errorLogger.js');
var database = rek('database.js');
var dbAccount = rek('dbAccount.js');

var auth = rek('auth.js');
var domainRouter = rek('domainRouter.js');
var accountRouter = rek('accountRouter.js');
var mainSite = rek('mainSite.js');
var userSite = rek('userSite.js');
var email = rek('email.js');

//setup ejs with views folder
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//log requests
//app.use(express.logger('dev'))
app.use(function (req, res, next) {
    res.template = new Object();
    next();
});
app.use(express.cookieParser('secret1010'));
app.use(express.cookieSession());
app.use(express.bodyParser());
app.use(domainRouter.domainRouter);
app.use(app.router);
app.use(mainSite.pageNotFound);

//TODO setup sass/compass(suposed to be best) or stylus
database.init(function (err, initDB) {
    //email.sendEmail("tbaron@uoguelph.ca","watup","hey dude you got mail");
	db = initDB;
    dbAccount.dbAccount();

    //DANGER DELETES ALL ACCOUNTS
    //mongoose.model('Account').removeAll();


    //posts requests
    app.post('/login', accountRouter.login);
    app.post('/signUp', accountRouter.signUp);
    app.post('/logout', accountRouter.logout);
    app.post('/dashboard/addRemovePages/*', accountRouter.addRemovePages);
    app.post('/dashboard/generalSiteSettings/*', accountRouter.saveSiteName);
    app.post('/dashboard/changeStyle/*', accountRouter.changeStyle);
    app.post(/\/savePage\/([^\/]+)(\/(.+))?/, accountRouter.savePage);

    //api requests
    app.post('/sendMail', email.sendEmailAjax);

    //static requests
    app.get('/public/*', function(req, res, next){
        express.static(__dirname)(req, res, function(){next('route')});
    });

    //clientSite requests
    app.get(/\/user\/([^\/]+)(\/(.+))?/, userSite.showClientPage);

    //mainSite requests
    app.get(/\/editPage\/([^\/]+)\/([^\/]+)/, mainSite.editPage);
    app.get(/\/(dashboard(\/([^\/]*))?)/, mainSite.dashboard);
    app.get('/*', mainSite.default);
    app.listen(3000);
    console.log("Started----------------------");

    //EXECUTE TESTS
	process.argv.forEach(function (val, index, array) {
		  if(index==2){
			  if(val=="testAll"){
				var testSuite = rek('testSuite.js');		
				testSuite.runDir('/tests/acceptance');
			  }
		  }
	});

});
