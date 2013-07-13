//NODE JS modules
var express = require('express');
var ejs = require('ejs');
var app = express();
var mongoose = require('mongoose');

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

//TODO setup sass/compass(suposed to be best) or stylus


database.init(function (err, initDB) {
    db = initDB;
    dbAccount.dbAccount();

    //posts requests
    app.post('/login', accountRouter.login);
    app.post('/signUp', accountRouter.signUp);
    app.post('/logout', accountRouter.logout);
    app.post(/\/savePage\/([^\/]+)(\/(.+))?/, accountRouter.savePage);

    //static requests
    app.get('/public/*', express.static(__dirname));

    //clientSite requests
    app.get(/\/user\/([^\/]+)(\/(.+))?/, userSite.showClientPage);

    //mainSite requests
    app.get(/\/editPage\/([^\/]+)\/([^\/]+)/, mainSite.editPage);
    app.get(/\/(dashboard(\/([^\/]*))?)/, mainSite.dashboard);
    app.get('/*', mainSite.showMainPage);
    app.listen(3000);
    console.log("Started----------------------");
});