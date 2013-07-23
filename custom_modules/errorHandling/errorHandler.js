var express = require('express');
var app = express();
var rek = require('rekuire');
var routingHelper = rek('routingHelper.js');

exports.ensureOrRedirectWithErr = function(req, res, next, condition, redirect, err, callback){
    if(condition){
        callback();
    }else{
        res.template.error=err;
        routingHelper.redirect(req, res, next, redirect);
    }
}