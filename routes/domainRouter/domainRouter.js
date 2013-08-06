exports.domainRouter = function(req, res, next){
	console.log(req.host);
    next();
}