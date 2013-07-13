var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var rek = require('rekuire');
var page = rek('pageObject.js');
var mainSite = rek('mainSite.js');

exports.dbAccount = function(db) {
	var accountSchema = mongoose.Schema({
		fullName: String,
		email: {
			type: String,
			unique: true
		},
        password: String,
		domain: {
			type: String,
			unique: true,
			sparse: true
		},
		pages: Array,
        global: mongoose.Schema.Types.Mixed
	});

    accountSchema.methods.getPageByDisplayName = function(name){
        for(var i = 0;i<this.pages.length;i++){
            if(this.pages[i].displayName===name){
                return this.pages[i];
                break;
            }
        }
    };

    accountSchema.statics.get = function(email, callback) {
        accountModel.findOne({
            email: email
        }, function(err, docs) {
            callback(err, docs);
        });
    };
    accountSchema.statics.authenticate = function(email, password, callback) {
        accountSchema.statics.get(email, function(err, docs) {
            if (err || !docs) {
                callback("Account doesnt exist");
            } else {
                bcrypt.compare(password, docs.password, function(err, res) {
                    if (res) {
                        callback(null);
                    } else {
                        callback("Wrong password");
                    }
                });
            }
        });
    };
    accountSchema.statics.removeAll = function() {
        this.remove(function(err) {});
    };

	var accountModel = mongoose.model('Account', accountSchema);
};
