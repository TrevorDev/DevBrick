var express = require('express');
var app = express();
var rek = require('rekuire');
var routingHelper = rek('routingHelper.js');

exports.ensureOrRedirectWithErr = function(req, res, next, condition, redirect, err, callback){
    if(condition){
        callback();
    }else{
        req.session.error=err;
        res.redirect(redirect);
    }
}

exports.getAndClearReqErr = function(req){
     if(req.session.error!=null){
        var err = req.session.error;
        delete req.session.error;
        return err;
     }else{
         return undefined;
     }
}