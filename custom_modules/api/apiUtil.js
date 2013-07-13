var fs = require('fs');

exports.getRequest = function(req){
	var file = req.params[0];
    return file;
}