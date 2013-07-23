var url = require('url');
var express = require('express');
var app = express();

exports.redirect = function(req, res, next, redirect){
        res.redirect(redirect);
}