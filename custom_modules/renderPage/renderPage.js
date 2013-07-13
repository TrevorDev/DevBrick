var fs = require('fs');
var ejs = require('ejs');

exports.render = function(req, res, next, file, options) {
    fs.exists(process.cwd() + '/views/' + file + '.ejs', function(exists) {
        if (exists) {
            res.render(file, options);
        } else {
            next();
        }
    });
};

exports.renderEditPage = function(req, res, next, page, options) {
    fs.readFile(process.cwd() + '/page_modules/' + page + '/views/edit.ejs', function(err, data) {
        if(!err){
            var pageString = data.toString('utf8');
            options.filename = process.cwd() + '/views/clientSites/'+res.template.email+'/home.ejs';
            res.send(ejs.render(pageString, options));
        }else{
            next();
        }
    });
};