var rek = require('rekuire');
var fs = require('fs');
exports.runDir = function(dir){
	var testCount=0;
	fs.readdir(process.cwd()+dir,function(err, dir){
    	exports.runTest(dir,0);
	});
}

exports.runTest = function(dir, num){
	if(num>=dir.length){
		console.log("All Tests Complete!");
	}else{
		if(dir[num].charAt(0)!='.'){
			var test = rek(dir[num]);
			if(test.runTest){
				console.log("Running: "+ dir[num]);
				test.runTest(function(){
					console.log("Passed: "+ dir[num]);
					exports.runNextTest(dir, num);
				});
			}else{
				exports.runNextTest(dir, num);
			}
		}else{
			exports.runNextTest(dir, num);
		}
	}
}

exports.runNextTest = function(dir, num){
	num++;
	exports.runTest(dir, num);
}