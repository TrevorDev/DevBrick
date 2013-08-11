var rek = require('rekuire');
var pageObject = rek('pageObject.js');
var stringUtil = rek('stringUtil.js');
var auth = rek('auth.js');
var fs = require('fs');

exports.page = function() {
    pageObject.page.call(this, 'blog', 'Blog');
    this.blogPosts = [];
    this.blogPosts.push(new exports.blogPost("Sample Post Title", "Sample blog text"));
    this.blogPosts.push(new exports.blogPost("Sample Post Title2", "Sample blog text2"));
    this.pageLink="";
    //this.blogName="blog name";
    this.allowComments = false;
};

exports.save = function(req, res, dbPage, callback, acc) {
    dbPage.pageLink = acc.domain+'/'+dbPage.displayName;
    if(req.body.deletePost){
        dbPage.blogPosts.splice(req.body.deletePost,1);
        callback("/editPage/"+dbPage.pageType+"/"+dbPage.displayName);
    }else if(req.body.submit){
        if(!req.files){
            req.files = {};
        }
        var date = new Date();
        pageObject.saveImg(req, req.files.postPic, dbPage, 'blogPostPic'+date.toISOString().replace('.','-'), function(picFileLocation, err){
            auth.getToken(function(token){
                dbPage.blogPosts.push(new exports.blogPost(req.body.postTitle, req.body.postText, req.body.postVideo, picFileLocation, req.body.postPicBorder, '#'+token));
                callback("/editPage/"+dbPage.pageType+"/"+dbPage.displayName);
            });
        });
    }else{
        if(req.body.allowComments){
            dbPage.allowComments = true;
        }else{
            dbPage.allowComments = false;
        }
        //dbPage.blogName=req.body.blogName;
        callback("/editPage/"+dbPage.pageType+"/"+dbPage.displayName);
    }
    
}

exports.blogPost = function(heading, text, video, picture, pictureBorder, commentUrl) {
    this.heading=heading;
    this.text=text;
    this.video='';
    this.img = picture;
    if(pictureBorder){
        this.imgBorder = true;
    }else{
        this.imgBorder = false;
    }    
    this.commentUrl = commentUrl;
    if(video){
        var match = video.match(/v=(.*?)($| |&)/);
        if(match && match.length >= 2){
            this.video = match[1];
        }
    }
}