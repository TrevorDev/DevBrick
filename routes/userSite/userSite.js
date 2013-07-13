var ejs = require('ejs');
var rek = require('rekuire');
var auth = rek('auth.js');
var renderPage = rek('renderPage.js');
var stringUtil = rek('stringUtil.js');

exports.showClientPage = function(req, res, next) {
    var email = req.params[0];
    var view = stringUtil.removeTrailingSlash(req.params[2]);

    res.template.page = view;
    res.template.loggedIn = auth.isLoggedIn(req);
    res.template.email = auth.getEmail(req);
    renderPage.render(req, res, next, 'clientSites/'+ email +'/'+ view, res.template);
};