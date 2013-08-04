var crypto = require('crypto');
var mongoose = require('mongoose');

exports.authenticate = function(req, callback){
	var email = req.body.email;
	var password = req.body.password;
    mongoose.model('Account').authenticate(email, password, function(err){
		if(!err){
			req.session.email=email;
		}
		callback(err);
	});
}

exports.clearAuth = function(req) {
	req.session=null;
}

exports.isLoggedIn = function(req) {
	return (req.session.email);
}

exports.getToken = function(callback) {
	crypto.randomBytes(48, function(ex, buf) {
		var token = buf.toString('hex');
		callback(token);
	});
}

exports.getEmail = function(req) {
	return (req.session.email);
}

exports.getSessionData = function(req){
	var sessionData = {};
    sessionData.loggedIn = exports.isLoggedIn(req);
    sessionData.email = exports.getEmail(req);
    return sessionData;
}