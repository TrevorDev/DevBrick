var mongoose = require('mongoose');
var ejs = require('ejs');
var rek = require('rekuire');
var auth = rek('auth.js');
var renderPage = rek('renderPage.js');
var stringUtil = rek('stringUtil.js');

exports.showClientPage = function(req, res, next) {
    var email = req.params[0];
    var view = stringUtil.removeTrailingSlash(req.params[2]);

    if (view === '') {
        var accSchema = mongoose.model('Account');
        //get homepage
        accSchema.findOne({ email: email },'homePage',{ lean: true },function(err, acc){
            view = acc.homePage;
            //TODO make this a function?
            res.template.page = view;
            renderPage.render(req, res, next, 'clientSites/'+ email +'/'+ view);
        });
    }else{
        res.template.page = view;
        renderPage.render(req, res, next, 'clientSites/'+ email +'/'+ view);
    }
};
