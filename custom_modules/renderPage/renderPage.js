var fs = require('fs');
var ejs = require('ejs');

exports.render = function(req, res, next, file) {
    fs.exists(process.cwd() + '/views/' + file + '.ejs', function(exists) {
        if (exists) {
            res.render(file, res.template);
        } else {
            next();
        }
    });
};

exports.renderEditPage = function(req, res, next, page) {
    fs.readFile(process.cwd() + '/page_modules/' + page + '/views/edit.ejs', function(err, data) {
        if(!err){
            var pageString = data.toString('utf8');
            //set filename to a made up page to be used as the reference for ejs
            res.template.filename = process.cwd() + '/views/clientSites/'+res.template.email+'/ref.ejs';
            res.send(ejs.render(pageString, res.template));
        }else{
            next();
        }
    });
};
