var rek = require('rekuire');
var fs = require('fs');
exports.runDir = function(dir){
	var testCount=0;
	fs.readdir(process.cwd()+dir,function(err, dir){
    	for (var i = 0; i<dir.length;i++){
			if(dir[i].charAt(0)!='.'){
				var test = rek(dir[i]);
				if(test.runTest){
					console.log("running: "+ dir[i]);
					testCount++;
					test.runTest(function(){
						testCount--;
						if(testCount==0){
							console.log("All Tests Complete!");
						}
					});
				}
			}
		}
	});

}
