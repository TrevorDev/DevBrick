exports.log = function(num, params){
	var errStr="Err:"+num+"\nLogs:";
	var args = Array.prototype.slice.call(arguments, 1);
	for(param in args){
		errStr = errStr + " " + args[param];
	}
	errStr+="\n";
	console.log(errStr);
}