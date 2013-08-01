var rek = require('rekuire');
var fs = require('fs');
exports.runDir = function(dir){

	fs.readdir(process.cwd()+dir,function(err, dir){
    	for (var i = 0; i<dir.length;i++){
			if(dir[i].charAt(0)!='.'){
			for (var func in rek(dir[i])){
				//if(typeof(func) == 'function'){
					console.log("running: "+ func);
					rek(dir[i])[func]();
				//}
			}
			}
		}
	});

}
