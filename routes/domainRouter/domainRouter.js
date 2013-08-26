exports.domainRouter = function(req, res, next){
	var host =req.host;
	host = req.host.replace("www.","");
	if(host=='conjuringhoudini.com'){
		if(req.url.split('/')[1]!='public'){
			req.url="/user/conjuringhoudini@gmail.com"+req.url;
		}
	}else if(host=='sidewaysdogproductions.com'){
		if(req.url.split('/')[1]!='public'){
			req.url="/user/sidewaysdogproductions@gmail.com"+req.url;
		}
	}
    next();
}