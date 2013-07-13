var bcrypt = require('bcrypt');
var mongodb = require('mongodb');
var mongoose = require('mongoose');

exports.init = function(callback) {
	//Setup connect
	//var mongourl = 'mongodb://localhost/test';
	var mongourl = 'mongodb://tb:q1q1q1@ds031328.mongolab.com:31328/dev_brick';
	//
	/*if(process.env.VCAP_SERVICES) {
		var env = JSON.parse(process.env.VCAP_SERVICES);
		mongourl = ['mongodb-1.8'][0]['credentials'];
	}*/
	mongoose.connect(mongourl);
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));

	db.once('open', function() {
		var err = null;
		callback(err, db);
	});
};