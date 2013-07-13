var bcrypt = require('bcrypt');

exports.crypt = function(string, callback){
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(string, salt, function(err, hash) {
            callback(hash);
        });
    });
}
exports.compareStringHash = function(string, hash, callback){
    bcrypt.compare(string, hash, function(err, res) {
        if (res) {
            callback(true);
        } else {
            callback(false);
        }
    });
}