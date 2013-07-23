var url = require('url');
var express = require('express');
var app = express();

exports.redirect = function(req, res, next, redirect){
        req.url = redirect;
        req.originalUrl=redirect;
        req._parsedUrl = url.parse(redirect);
        req.method='GET';
        //console.log(req);
        app.router(req, res, next);
}